using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Models
{
    public class Record
    {
        [Key]
        public int RecordId { get; set; }

        [Required]
        public DateTime RecordDate { get; set; }

        [Required]
        public virtual Time RecordTime { get; set; }

        [Required]
        public virtual int TimeId{ get; set; }

        [Required]
        public virtual User User { get; set; }

        [Timestamp]
        public DateTime RowVersion { get; set; }

        public DateTime TimeCreated { get; set; } = DateTime.Now;
    }
}
