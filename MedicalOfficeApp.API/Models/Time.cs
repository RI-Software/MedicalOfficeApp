using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Models
{
    public class Time
    {
        [Key]
        public int TimeId { get; set; }

        [Required]
        public TimeSpan PossibleTime { get; set; }

        public virtual ICollection<Record> Records { get; set; }
    }
}
