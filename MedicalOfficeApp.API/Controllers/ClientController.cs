using AutoMapper;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Core.ActionFilters;
using MedicalOfficeApp.API.Core.RecordCollection;
using MedicalOfficeApp.API.Core.WorkingDaysCollection;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Dtos;
using MedicalOfficeApp.API.Models;
using MedicalOfficeApp.API.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Controllers
{
    [ServiceFilter(typeof(RelevantRecordsFilter))]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IRecordRepository repo;
        private readonly IOptions<WorkingDaysCollection> recordSettings;
        private readonly IOptions<DateRecordCollection> recordsInMemory;
        private readonly IOptions<AuthSettings> authOptions;
        private readonly IMapper mapper;
        private readonly DayOfWeek[] workingDays;
        private readonly int numOfDaysInAdvance;

        public ClientController(
            IRecordRepository repo,
            IOptions<BookingSettings> bookingSettings,
            IOptions<WorkingDaysCollection> recordSettings,
            IOptions<DateRecordCollection> recordsInMemory,
            IOptions<AuthSettings> authOptions,
            IMapper mapper)
        {
            this.repo = repo;
            this.recordSettings = recordSettings;
            this.recordsInMemory = recordsInMemory;
            this.authOptions = authOptions;
            this.mapper = mapper;
            this.workingDays = recordSettings.Value.WorkingDays.Select(d => d.DayOfWeek).ToArray();
            this.numOfDaysInAdvance = bookingSettings.Value.NumOfDaysInAdvance;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Register (ClientDto client)
        {
            DateTime date = DateTime.Parse(User.Claims.Single(c => c.Type == "date").Value);
            TimeSpan time = TimeSpan.Parse(User.Claims.Single(c => c.Type == "time").Value);

            var recordFromMemory = recordsInMemory
                .Value
                .Records
                .FirstOrDefault(r => r.Date == date && r.Time == time); ;

            if (recordFromMemory == null)
                return BadRequest("You missed the booking stage");

            Client clientForRecord = mapper.Map<Client>(client);

            DbRecord record = new DbRecord() { Date = date, Time = time, Client = clientForRecord };

            repo.Add(record);

            if (await repo.SaveAll())
            {
                recordsInMemory.Value.Records.Remove(recordFromMemory);

                return NoContent();
            }
                
            throw new Exception("Failed on save");
        }

        [HttpPost]
        public async Task<IActionResult> PreRegister (RecordDto record)
        {
            var recordsFromDb = await repo.GetRecordsFromDb();
            var recordsFromMemory = recordsInMemory.Value.Records;
            DateTime dateUpperBound = DateTime.Now.Date.AddCalendarDays(workingDays, numOfDaysInAdvance);
            var allowedTime = recordSettings
                .Value
                .WorkingDays
                .Where(d => d.DayOfWeek == record.Date.DayOfWeek)
                .First()
                .AllowedTime;


            if (record.Date < DateTime.Now.Date || record.Date > dateUpperBound)
                return BadRequest("Date out of bounds of allowed dates");

            if (record.Date == DateTime.Now.Date && record.Time < DateTime.Now.TimeOfDay)
                return BadRequest("This time has already passed");

            if (!allowedTime.Where(t => t == record.Time).Any())
                return BadRequest("Time out of bounds of allowed times");

            if (recordsFromDb.Where(r => r.Date == record.Date && r.Time == record.Time).Any())
                return BadRequest("This time is already taken");

            if (recordsFromMemory.Where(r => r.Date == record.Date && r.Time == record.Time && r.TimeCreated < DateTime.Now).Any())
                return BadRequest("Somebody is trying to book this time");


            recordsInMemory.Value.Records.Add(new DateRecord(record.Date, record.Time));


            var generatedToken = GenerateToken(record);

            return Ok(new
            {
                token = generatedToken
            });
        }

        [HttpPost]
        [Authorize]
        public IActionResult FreeRecord ()
        {
            DateTime date = DateTime.Parse(User.Claims.Single(c => c.Type == "date").Value);
            TimeSpan time = TimeSpan.Parse(User.Claims.Single(c => c.Type == "time").Value);

            var recordsFromMemory = recordsInMemory.Value.Records;

            recordsFromMemory.RemoveAll(record => record.Date == date && record.Time == time);

            return NoContent();
        }

        private string GenerateToken(RecordDto record)
        {
            var tokenLifetime = authOptions.Value.ClientTokenLifetime;

            var claims = new List<Claim>();

            claims.Add(new Claim("date", record.Date.ToString()));
            claims.Add(new Claim("time", record.Time.ToString()));
            claims.Add(new Claim("role", "client"));

            return authOptions.Value.GenerateToken(claims, tokenLifetime);
        }
    }
}
