using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Core
{
    public class DateRecordCollection
    {
        public ConcurrentBag<Date> Dates { get; }

        public DateRecordCollection() =>
            Dates = new ConcurrentBag<Date>();

        public Task AddDateAsync(DateTime day, TimeSpan time)
        {
            return Task.Run(() =>
            {
                Dates.Add(new Date(day, time));
            });
        }
    }
}
