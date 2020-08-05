using MedicalOfficeApp.API.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Dtos
{
    public class TimeForListDto
    {
        public TimeSpan Time { get; set; }

        public string Status { get; set; }
    }
}
