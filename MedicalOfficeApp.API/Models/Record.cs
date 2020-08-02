﻿using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Models
{
    public class Record
    {
        [Key]
        public int RecordId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public virtual TimeSpan Time { get; set; }

        [Required]
        public virtual User User { get; set; }

        [Timestamp]
        public DateTime RowVersion { get; set; }

        public DateTime TimeCreated { get; set; }
    }
}