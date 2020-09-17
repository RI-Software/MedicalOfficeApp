using System;


namespace MedicalOfficeApp.API.Dtos
{
    public class TimeForListDto
    {
        public string Time { get; set; }

        public string Status { get; set; }

        public TimeForListDto() { }

        public TimeForListDto(long time, string status)
            :this()
        {
            Time = new TimeSpan(time).ToString();
            Status = status;
        }
    }
}
