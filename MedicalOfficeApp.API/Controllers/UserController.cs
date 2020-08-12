using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Core.RecordCollection;
using MedicalOfficeApp.API.Core.WorkingDaysCollection;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Dtos;
using MedicalOfficeApp.API.Shared;
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
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRecordRepository repo;
        private readonly IOptions<WorkingDaysCollection> recordSettings;
        private readonly IOptions<DateRecordCollection> recordsInMemory;
        private readonly IOptions<AuthSettings> authOptions;
        private readonly DayOfWeek[] workingDays;
        private readonly int numOfDaysInAdvance;

        public UserController(
            IRecordRepository repo,
            IOptions<BookingSettings> bookingSettings,
            IOptions<WorkingDaysCollection> recordSettings,
            IOptions<DateRecordCollection> recordsInMemory,
            IOptions<AuthSettings> authOptions)
        {
            this.repo = repo;
            this.recordSettings = recordSettings;
            this.recordsInMemory = recordsInMemory;
            this.authOptions = authOptions;
            this.workingDays = recordSettings.Value.WorkingDays.Select(d => d.DayOfWeek).ToArray();
            this.numOfDaysInAdvance = bookingSettings.Value.NumOfDaysInAdvance;
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

            if (!allowedTime.Where(t => t == record.Time).Any())
                return BadRequest("Time out of bounds of allowed times");

            if (recordsFromDb.Where(r => r.Date == record.Date && r.Time == record.Time).Any())
                return BadRequest("This time is already taken");

            if (recordsFromMemory.Where(r => r.Date == record.Date && r.Time == record.Time && r.TimeCreated < DateTime.Now).Any())
                return BadRequest("Somebody is trying to book this time");

            recordsInMemory.Value.Records.Add(new DateRecord(record.Date, record.Time)); //time should be added not in a such way


            var token = GenerateToken(record);

            return Ok(token);
        }

        private string GenerateToken(RecordDto record)
        {
            var authParams = authOptions.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>();

            claims.Add(new Claim("date", record.Date.ToString()));
            claims.Add(new Claim("time", record.Time.ToString()));

            var token = new JwtSecurityToken(
                issuer: authParams.Issuer,
                audience: authParams.Audience,
                claims: claims,
                expires: DateTime.Now.Add(authParams.TokenLifeTime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
