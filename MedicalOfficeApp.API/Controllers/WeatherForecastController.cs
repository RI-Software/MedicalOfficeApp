using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalOfficeApp.API.Data;
using MedicalOfficeApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MedicalOfficeApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly DataContext context;

        public WeatherForecastController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public void Get()
        {
        }
    }
}
