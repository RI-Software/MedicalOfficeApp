using MedicalOfficeApp.API.Core;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Dtos
{
    public class RecordDto : IRecord
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public long Time { get; set; }

        [JsonConstructor]
        public RecordDto(DateTime date, TimeSpan time) 
            : base()
        {
            Date = date;
            Time = time.Ticks;
        }
    }
}
