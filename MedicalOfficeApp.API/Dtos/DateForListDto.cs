using System;

namespace MedicalOfficeApp.API.Dtos
{
    public class DateForListDto
    {
        public DateTime Date { get; set; }

        public DateStatuses Status { get; set; }
    }
}
