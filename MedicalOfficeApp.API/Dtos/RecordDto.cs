using MedicalOfficeApp.API.Core;
using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Dtos
{
    public class RecordDto : IRecord
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan Time { get; set; }

        public RecordDto(DateTime date, TimeSpan time) 
            : base()
        {
            Date = date;
            Time = time;
        }
    }
}
