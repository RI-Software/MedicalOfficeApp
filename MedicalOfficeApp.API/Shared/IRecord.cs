using System;

namespace MedicalOfficeApp.API.Core
{
    public interface IRecord
    {
        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }
    }
}
