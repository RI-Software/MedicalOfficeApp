using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Dtos
{
    public class DateForListDto
    {
        public DateTime Date { get; set; }

        public DateStatus Status { get; set; }
    }
}
