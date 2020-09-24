using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Data;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

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
            return Ok(await ApiResult<DbRecord>.CreateAsync(
                repo.GetRecords(),
                recordParams.PageIndex,
                recordParams.PageSize,
                recordParams.SortColumns,
                recordParams.SortOrder));
        }
    }
}
