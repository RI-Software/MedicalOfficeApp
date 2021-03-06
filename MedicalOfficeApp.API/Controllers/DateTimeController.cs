﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Core.ActionFilters;
using MedicalOfficeApp.API.Core.WorkingDaysCollection;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Dtos;
using MedicalOfficeApp.API.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MedicalOfficeApp.API.Controllers
{
    [ServiceFilter(typeof(RelevantRecordsFilter))]
    [Route("api/[controller]")]
    [ApiController]
    public class DateTimeController : ControllerBase
    {
        private readonly IRecordRepository repo;
        private readonly IOptions<DateRecordCollection> recordsInMemory;
        private readonly IOptions<WorkingDaysCollection> recordSettings;
        private readonly DayOfWeek[] workingDays;
        private readonly int numOfDaysInAdvance;

        public DateTimeController(
            IRecordRepository repo,
            IOptions<BookingSettings> bookingSettings,
            IOptions<WorkingDaysCollection> recordSettings,
            IOptions<DateRecordCollection> recordsInMemory)
        {
            this.repo = repo;
            this.recordsInMemory = recordsInMemory;
            this.recordSettings = recordSettings;
            this.workingDays = recordSettings.Value.WorkingDays.Select(d => d.DayOfWeek).ToArray();
            this.numOfDaysInAdvance = bookingSettings.Value.NumOfDaysInAdvance;
        }

        [HttpGet]
        public async Task<IActionResult> Dates()
        {
            DateTime dateUpperBound = DateTime.Now.Date.AddCalendarDays(workingDays, numOfDaysInAdvance);
            List<DateForListDto> recordsToReturn = new List<DateForListDto>();

            var recordsFromDb = (await repo.GetRecords().Where(r => r.Date <= dateUpperBound).ToListAsync())
                .Cast<IRecord>();
            var recordsFromMemory = recordsInMemory
                .Value
                .Records
                .Cast<IRecord>();

            var allRecords = recordsFromDb.Union(recordsFromMemory);


            for (DateTime date = DateTime.Now.Date; date <= dateUpperBound; date = date.AddDays(1))
            {
                if (!workingDays.Contains(date.DayOfWeek))
                {
                    recordsToReturn.Add(new DateForListDto() { Date = date, Status = DateStatuses.Busy });
                    continue;
                }
                    
                var allowedTime = recordSettings.Value.WorkingDays.Where(d => d.DayOfWeek == date.DayOfWeek).First().AllowedTime;
                var records = allRecords.Where(r => r.Date == date);
                long timeNow = TimeSpan.Zero.Ticks;

                if (date == DateTime.Now.Date)
                    timeNow = DateTime.Now.TimeOfDay.Ticks;

                if (records.Where(t => t.Time > timeNow)?.Count() >= allowedTime.Where(t => t > timeNow)?.Count())
                {
                    recordsToReturn.Add(new DateForListDto() { Date = date, Status = DateStatuses.Busy });
                    continue;
                }

                recordsToReturn.Add(new DateForListDto() { Date = date, Status = DateStatuses.Free });
            }

            return Ok(recordsToReturn);
        }

        [HttpGet("{requestedDate}", Name = "Dates")]
        public async Task<IActionResult> Dates(DateTime requestedDate)
        {
            DayOfWeek requestedDayOfWeek = requestedDate.DayOfWeek;

            if (requestedDate > DateTime.Now.Date.AddCalendarDays(workingDays, numOfDaysInAdvance))
                return BadRequest("That day is not available yet");

            if (requestedDate < DateTime.Now.Date)
                return BadRequest("That day has already passed");

            //check if that day is in work days
            if (recordSettings.Value.WorkingDays.Where(d => d.DayOfWeek == requestedDayOfWeek).FirstOrDefault() == null)
                return BadRequest("That day is not supported");


            var todayRecordsFromDb = await repo
                .GetRecords()
                .Where(r => r.Date == requestedDate)
                .ToListAsync();

            var todayRecordsFromMemory = recordsInMemory
                .Value
                .Records
                .Where(r => r.Date == requestedDate);

            var allowedTime = recordSettings
                .Value
                .WorkingDays
                .Where(d => d.DayOfWeek == requestedDayOfWeek)
                .First()
                .AllowedTime;

            List<TimeForListDto> timesToReturn = new List<TimeForListDto>();

            foreach (var time in allowedTime)
            {
                //if the time has already passed today
                if (requestedDate == DateTime.Now.Date && time < DateTime.Now.TimeOfDay.Ticks)
                {
                    AddTimeToReturnList(time, TimeStatus.Expired);
                    continue;
                }

                if (todayRecordsFromDb.Where(r => r.Time == time).FirstOrDefault() != null)
                {
                    AddTimeToReturnList(time, TimeStatus.Taken);
                    continue;
                }

                if (todayRecordsFromMemory.Where(r => r.Time == time).FirstOrDefault() != null)
                {
                    AddTimeToReturnList(time, TimeStatus.InProcess);
                    continue;
                }

                AddTimeToReturnList(time, TimeStatus.Free);
            }


            void AddTimeToReturnList(long time, TimeStatus timeStatus) =>
                timesToReturn.Add(new TimeForListDto{Time = time.ToString(), Status = timeStatus});

            return Ok(timesToReturn);
        }
    }
}
