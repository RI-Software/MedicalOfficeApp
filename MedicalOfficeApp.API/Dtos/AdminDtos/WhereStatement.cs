using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Dtos.AdminDtos
{
    public class WhereStatement
    {
        public string Column { get; set; }

        public string Value { get; set; }
    }
}
