using System;

namespace MedicalOfficeApp.API.Core.RecordCollection
{
    public class DateRecord : IRecord
    {
        public DateTime Date { get; set; }

        public long Time { get; set; }

        public DateTime TimeCreated { get; set; }

        private DateRecord()
        {
            TimeCreated = DateTime.Now;
        }

        private DateRecord(DateTime date)
            : this()
        {
            Date = date;
        }

        public DateRecord(DateTime date, TimeSpan time)
            :this(date)
        {
            Time = time.Ticks;
        }

        public DateRecord(DateTime date, long time)
            :this(date)
        {
            Time = time;
        }
    }
}
