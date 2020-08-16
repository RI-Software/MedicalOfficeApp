using MedicalOfficeApp.API.Models;
using MedicalOfficeApp.API.Shared;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using System;
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
                    record.User.Phone = Extensions.MakeAcceptableNumber(record.User.Phone);
                }

                context.Records.AddRange(records);
                context.SaveChanges();
            }
        }

        public static void DeleteOldRecords(DataContext context, int numOfDaysOfPreservation)
        {
            var entitiesToBeDeleted = context
                    .Records
                    .Where(r => r.TimeCreated < DateTime.Now.Date.AddDays(-numOfDaysOfPreservation));

            context.Records.RemoveRange(entitiesToBeDeleted);

            context.SaveChanges();
        }
    }
}
