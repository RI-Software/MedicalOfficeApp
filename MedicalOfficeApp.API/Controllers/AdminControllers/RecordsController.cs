using System.Collections.Generic;
using System.Threading.Tasks;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Data;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Dtos.AdminDtos;
using MedicalOfficeApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace MedicalOfficeApp.API.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordsController : ControllerBase
    {
        private readonly IRecordRepository repo;
        private readonly IOptions<DateRecordCollection> recordsInMemory;

        public RecordsController(
             IRecordRepository repo,
             IOptions<DateRecordCollection> recordsInMemory)
        {
            this.repo = repo;
            this.recordsInMemory = recordsInMemory;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Records([FromQuery]RecordParams recordParams)
        {
            var whereStatements = JsonConvert.DeserializeObject<List<WhereStatement>>(recordParams.WhereStatements);

            return Ok(await ApiResult<DbRecord>.CreateAsync(
                repo.GetRecords(),
                recordParams.PageIndex,
                recordParams.PageSize,
                whereStatements,
                recordParams.SortColumns,
                recordParams.SortOrder));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Records(int id)
        {
            var record = await repo.GetRecord(id);

            if (record == null)
                return BadRequest("This record does not exists.");

            return Ok(record);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteRecord(int id)
        {
            var record = await repo.GetRecord(id);

            if (record == null)
                return BadRequest("This record does not exists");

            repo.DeleteRecord(record);

            if(await repo.SaveAll())
                return NoContent();

            return BadRequest($"Deleting record {id} failed on save.");
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> ChangeStatus (int id, [FromBody]RecordStatusDto status)
        {
            var record = await repo.GetRecord(id);

            if (record == null)
                return BadRequest("Record does not exist.");

            if (record.Status == status.Status.ToString().ToLower())
                return BadRequest("You are trying to assign the same status.");

            record.Status = status.Status.ToString();

            if (await repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest($"Updating record {id} failed on save.");
        }
    }
}
