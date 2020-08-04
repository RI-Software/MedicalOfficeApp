using System;
using System.Collections.Generic;
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

        public DateTimeController(
            IRecordRepository repo,
            IOptions<BookingSettings> bookingSettings,
            IOptions<WorkingDaysCollection> recordSettings)
        {
            this.repo = repo;
            this.bookingSettings = bookingSettings;
            this.recordSettings = recordSettings;
        }

        [HttpGet]
        public async Task<IActionResult> Dates()
        {
            int numOfDaysInAdvance = bookingSettings.Value.NumOfDaysInAdvance;

            List<IRecord> records = await repo.GetAllRecords();

            var datesToReturn = await CheckDaysForAvailability(records, numOfDaysInAdvance);

            return Ok(datesToReturn);
        }

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