using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Core
{
    public class Date
    {
        public DateTime Day { get; }

        public ConcurrentBag<Time> Times { get; }

        public Date(DateTime day, params TimeSpan[] times)
        {
            Day = day;
            Times = new ConcurrentBag<Time>();
            AddTimeAsync(times);
        }

        public Task AddTimeAsync(params TimeSpan[] times)
        {
            return Task.Run(() =>
            {
                foreach (TimeSpan time in times)
                {
                    Times.Add(new Time(time));
                }
            });
        }
    }
}