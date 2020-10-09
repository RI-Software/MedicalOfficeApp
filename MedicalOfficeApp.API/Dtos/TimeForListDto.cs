using MedicalOfficeApp.API.Core;
using System;


namespace MedicalOfficeApp.API.Dtos
{
    public class TimeForListDto
    {
        public string Time { get; set; }

        public TimeStatus Status { get; set; }
    }
}
