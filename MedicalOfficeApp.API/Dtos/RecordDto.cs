using MedicalOfficeApp.API.Core;
using System;

namespace MedicalOfficeApp.API.Dtos
{
    public class RecordDto : IRecord
    {
        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }

        public RecordDto(DateTime date, TimeSpan time) 
            : base()
        {
            Date = date;
            Time = time;
        }
    }
}
