using System;

namespace MedicalOfficeApp.API.Core
{
    public class BookingSettings
    {
        public int NumOfDaysInAdvance { get; set; }

        public TimeSpan TimeToRegister { get; set; }
    }
}
