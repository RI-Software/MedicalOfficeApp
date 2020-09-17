using System;
using System.Collections.Generic;

namespace MedicalOfficeApp.API.Core.WorkingDaysCollection
{
    public class WorkingDaysCollection
    {
        public List<WorkingDay> WorkingDays { get; set; }

        public TimeSpan TimePerClient { get; set; }

        public void InitialSetUp()
        {
            foreach (var day in WorkingDays)
            {
                day.AllowedTime = new List<long>();

                for (long i = day.Start.Ticks; i < day.Stop.Ticks; i += TimePerClient.Ticks)
                {
                    day.AllowedTime.Add(i);
                }
            }
        }
    }
}
