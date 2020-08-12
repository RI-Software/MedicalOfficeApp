using System;

namespace MedicalOfficeApp.API.Core.RecordCollection
{
    public class DateRecord : IRecord
    {
        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }

        public DateTime TimeCreated { get; set; }

        public DateRecord()
        {
            TimeCreated = DateTime.Now;
        }

        public DateRecord(DateTime date, TimeSpan time)
            : this()
        {
            Date = date;
            Time = time;
        }
    }
}
