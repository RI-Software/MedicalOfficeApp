using System;
using System.Collections.Generic;

namespace MedicalOfficeApp.API.Core.WorkingDaysCollection
{
    public class WorkingDay
    {
        public DayOfWeek DayOfWeek { get; set; }

        public TimeSpan Start { get; set; }

        public TimeSpan Stop { get; set; }

        public List<TimeSpan> AllowedTime { get; set; }
    }
}
