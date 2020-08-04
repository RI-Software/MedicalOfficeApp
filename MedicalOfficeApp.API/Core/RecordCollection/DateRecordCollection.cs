using MedicalOfficeApp.API.Core.RecordCollection;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Core
{
    public class DateRecordCollection
    {
        public ConcurrentBag<DateRecord> Records { get; }

        public DateRecordCollection() =>
            Records = new ConcurrentBag<DateRecord>();

        public Task AddDateAsync(DateTime day, TimeSpan time)
        {
            return Task.Run(() =>
            {
                Records.Add(new DateRecord(day, time));
            });
        }
    }
}
