using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Core.WorkingDaysCollection;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Dtos;
using MedicalOfficeApp.API.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MedicalOfficeApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DateTimeController : ControllerBase
    {
        private readonly IRecordRepository repo;
        private readonly DateRecordCollection recordsInMemory;
        private readonly IOptions<WorkingDaysCollection> recordSettings;
        private readonly DayOfWeek[] workingDays;
        private readonly int numOfDaysInAdvance;

        public DateTimeController(
            IRecordRepository repo,
            IOptions<BookingSettings> bookingSettings,
            IOptions<WorkingDaysCollection> recordSettings,
            DateRecordCollection recordsInMemory)
        {
            this.repo = repo;
            this.recordsInMemory = recordsInMemory;
            this.recordSettings = recordSettings;
            this.workingDays = recordSettings.Value.WorkingDays.Select(d => d.DayOfWeek).ToArray();
            this.numOfDaysInAdvance = bookingSettings.Value.NumOfDaysInAdvance;
        }

        //ToDo: get rid of GetAllRecords method
        [HttpGet]
        public async Task<IActionResult> Dates()
        {
            DateTime dateUpperBound = DateTime.Now.Date.AddCalendarDays(workingDays, numOfDaysInAdvance);
            List<DateForListDto> recordsToReturn = new List<DateForListDto>();

            var recordsFromDb = await repo.GetRecordsFromDb();
            var recordsFromMemory = recordsInMemory.Records;

            for (DateTime date = DateTime.Now.Date; date <= dateUpperBound; date = date.AddDays(1))
            {
                if (!workingDays.Contains(date.DayOfWeek))
                {
                    recordsToReturn.Add(new DateForListDto() { Date = date, Status = DateStatuses.Busy.ToString() });
                    continue;
                }
                    
                var allowedTime = recordSettings.Value.WorkingDays.Where(d => d.DayOfWeek == date.DayOfWeek).First().AllowedTime;
                int? numOfRecordsInDb =  recordsFromDb.Where(r => r.Date == date)?.Count();
                int? numOfRecordsInMemory = recordsFromMemory.Where(r => r.Date == date)?.Count();

                if(numOfRecordsInDb + numOfRecordsInMemory >= allowedTime.Count)
                {
                    recordsToReturn.Add(new DateForListDto() { Date = date, Status = DateStatuses.Busy.ToString() });
                    continue;
                }

                recordsToReturn.Add(new DateForListDto() { Date = date, Status = DateStatuses.Free.ToString() });
            }

            return Ok(recordsToReturn);
        }

        [HttpGet("{requestedDate}", Name = "Dates")]
        public async Task<IActionResult> Dates (DateTime requestedDate) 
        {
            DayOfWeek requestedDayOfWeek = requestedDate.DayOfWeek;

            if (requestedDate > DateTime.Now.Date.AddCalendarDays(workingDays, numOfDaysInAdvance))
                return BadRequest("That day is not available yet");

            if (requestedDate < DateTime.Now.Date)
                return BadRequest("That day has already passed");

            //check if that day is in work days
            if (recordSettings.Value.WorkingDays.Where(d => d.DayOfWeek == requestedDayOfWeek).FirstOrDefault() == null)
                return BadRequest("That day is not supported");


            var todayRecordsFromDb = (await repo.GetRecordsFromDb())
                .Where(r => r.Date == requestedDate);
            var todayRecordsFromMemory = recordsInMemory
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
                if (requestedDate == DateTime.Now.Date && time < DateTime.Now.TimeOfDay)
                {
                    timesToReturn.Add(new TimeForListDto() { Time = time, Status = TimeStatus.Expired.ToString() });
                    continue;
                }

                if(todayRecordsFromDb.Where(r => r.Time == time).FirstOrDefault() != null)
                {
                    timesToReturn.Add(new TimeForListDto() { Time = time, Status = TimeStatus.Taken.ToString() });
                    continue;
                }

                if (todayRecordsFromMemory.Where(r => r.Time == time).FirstOrDefault() != null)
                {
                    timesToReturn.Add(new TimeForListDto() { Time = time, Status = TimeStatus.InProcess.ToString() });
                    continue;
                }

                timesToReturn.Add(new TimeForListDto() { Time = time, Status = TimeStatus.Free.ToString() });
            }

            return Ok(timesToReturn);
        }
    }
}
