using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
