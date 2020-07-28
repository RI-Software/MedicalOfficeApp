using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace MedicalOfficeApp.API.Data
{
    public static class Seed
    {
        public static void SeedPossibleTime (DataContext context)
        {
            if (!context.Times.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/timeGenerated.json");
                var times = JsonConvert.DeserializeObject<List<Time>>(userData);

                context.Times.AddRange(times);
                context.SaveChanges();
            }
        }

        public static void SeedRecordsAndUsers(DataContext context)
        {
            if (!context.Records.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/timeGenerated.json");
                var records = JsonConvert.DeserializeObject<List<Record>>(userData);
                foreach (Record record in records)
                {
                    //create function to update phone number
                }
            }
        }
    }
}
