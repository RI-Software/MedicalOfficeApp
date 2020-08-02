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
                day.AllowedTime = new List<TimeSpan>();

                for (TimeSpan i = day.Start; i < day.Stop; i += TimePerClient)
                {
                    day.AllowedTime.Add(i);
                }
            }
        }
    }
}
