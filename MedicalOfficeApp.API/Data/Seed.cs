using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace MedicalOfficeApp.API.Data
{
    public static class Seed
    {
        public static void SeedRecordsAndUsers(DataContext context)
        {
            if (!context.Records.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/GeneratedJson/recordAndDataGenerated.json");
                var records = JsonConvert.DeserializeObject<List<DbRecord>>(userData);

                foreach (DbRecord record in records)
                {
                    record.User.Phone = Seed.MakeAcceptableNumber(record.User.Phone);
                }

                context.Records.AddRange(records);
                context.SaveChanges();
            }
        }

        private static string MakeAcceptableNumber(string phoneNumber)
        {
            phoneNumber = new string(phoneNumber.Where((letter) =>
            {
                return int.TryParse(letter.ToString(), out int _);
            }).ToArray());

            return phoneNumber;
        }
    }
}