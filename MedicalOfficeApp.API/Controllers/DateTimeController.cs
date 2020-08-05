using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Core.WorkingDaysCollection;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MedicalOfficeApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DateTimeController : ControllerBase
    {
        private readonly IRecordRepository repo;
        private readonly IOptions<BookingSettings> bookingSettings;
        private readonly IOptions<WorkingDaysCollection> recordSettings;
        private readonly DateRecordCollection recordsInMemory;

        public DateTimeController(
            IRecordRepository repo,
            IOptions<BookingSettings> bookingSettings,
            IOptions<WorkingDaysCollection> recordSettings,
            DateRecordCollection recordsInMemory)
        {
            this.repo = repo;
            this.bookingSettings = bookingSettings;
            this.recordSettings = recordSettings;
            this.recordsInMemory = recordsInMemory;
        }

        [HttpGet]
        public async Task<IActionResult> Dates()
        {
            int numOfDaysInAdvance = bookingSettings.Value.NumOfDaysInAdvance;

            List<IRecord> records = await repo.GetAllRecords();

            var datesToReturn = await CheckDaysForAvailability(records, numOfDaysInAdvance);

            return Ok(datesToReturn);
        }

        [HttpGet("{requestedDate}", Name = "Dates")]
        public async Task<IActionResult> Dates (DateTime requestedDate) {

            DayOfWeek requestedDayOfWeek = requestedDate.DayOfWeek;

            //check if that day is in work days
            if (recordSettings.Value.WorkingDays.Where(d => d.DayOfWeek == requestedDayOfWeek).FirstOrDefault() == null)
                return BadRequest("This day is not supported");

            var todayRecordsFromDb = (await repo.GetAllRecords())
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

        //ToDo: Update method to send back free days also.
        private async Task<List<DateForListDto>> CheckDaysForAvailability (List<IRecord> records, int numOfDaysInAdvance)
        {
            var result = await Task.Run(() =>
            {
                List<DateForListDto> recordsToReturn = new List<DateForListDto>();

                for (int i = 0; i < numOfDaysInAdvance; i++)
                {
                    var allowedDay = recordSettings
                        .Value
                        .WorkingDays
                        .Where(d => d.DayOfWeek == DateTime.Now.AddDays(i).DayOfWeek)
                        .FirstOrDefault();

                    var recordedDay = records
                        .Where(r => r.Date == DateTime.Now.AddDays(i).Date);

                    if (allowedDay == null) //if the day is not working day
                    {
                        numOfDaysInAdvance++;
                        continue;
                    }

                    if (allowedDay.AllowedTime.Count <= recordedDay?.Count())
                    {
                        recordsToReturn
                            .Add(new DateForListDto() { Date = DateTime.Now.Date.AddDays(i), Status = DateStatuses.Busy.ToString() });
                        continue;
                    }

                    recordsToReturn.Add(new DateForListDto() { Date = DateTime.Now.Date.AddDays(i), Status = DateStatuses.Free.ToString() });
                }

                return recordsToReturn;
            });

            return result;
        }
    }
}