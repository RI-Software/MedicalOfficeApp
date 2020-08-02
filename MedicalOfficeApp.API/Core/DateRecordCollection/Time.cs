using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Core
{
    public class Time
    {
        public TimeSpan Hour { get; }

        public DateTime TimeCreated { get; }

        public Time(TimeSpan hour)
        {
            Hour = hour;
            TimeCreated = DateTime.Now;
        }
    }
}
