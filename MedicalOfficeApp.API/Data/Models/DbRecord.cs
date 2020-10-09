using MedicalOfficeApp.API.Core;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Models
{
    public class DbRecord : IRecord
    {
        [Key]
        public int RecordId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public virtual long Time { get; set; }

        [Required]
        public virtual Client Client { get; set; }

        [Timestamp]
        [JsonIgnore]
        public DateTime RowVersion { get; set; }

        [JsonIgnore]
        public DateTime TimeCreated { get; set; }

        public string Status { get; set; }

        public DbRecord()
        {
        }

        [JsonConstructor]
        public DbRecord(DateTime date, TimeSpan time, Client client)
            :this()
        {
            Date = date;
            Time = time.Ticks;
            Client = client;
        }
    }
}
