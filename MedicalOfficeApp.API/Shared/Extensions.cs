using System;
using System.Linq;

namespace MedicalOfficeApp.API.Shared
{
    public static class Extensions
    {
        public static DateTime AddCalendarDays (this DateTime dateTime, DayOfWeek[] workingDays, int numOfBusinessDays)
        {
            DayOfWeek[] week = Enum.GetValues(typeof(DayOfWeek)).Cast<DayOfWeek>().ToArray();
            int[] freeDays = week.Except(workingDays).Cast<int>().ToArray();

            int numOfCalendarDays = numOfBusinessDays;

            for (int i = 1; i <= numOfCalendarDays; i++)
            {
                if (freeDays.Contains((int)dateTime.AddDays(i).DayOfWeek))
                {
                    numOfCalendarDays++;
                }
            }

            return dateTime.AddDays(numOfCalendarDays);
        }

        public static string MakeAcceptableNumber(this string phoneNumber)
        {
            phoneNumber = new string(phoneNumber.Where((letter) =>
            {
                return int.TryParse(letter.ToString(), out int _);
            }).ToArray());

            return phoneNumber;
        }
    }
}
