using MedicalOfficeApp.API.Data.Models;
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
        public static void SeedRecordsAndClients(DataContext context)
        {
            if (!context.Records.Any())
            {
                var clientsData = System.IO.File.ReadAllText("Data/GeneratedJson/recordAndDataGenerated.json");
                var records = JsonConvert.DeserializeObject<List<DbRecord>>(clientsData);

                foreach (DbRecord record in records)
                {
                    record.Client.Phone = Extensions.MakeAcceptableNumber(record.Client.Phone);
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

        public static void SeedAdmin(DataContext context, string username, string password)
        {
            if (!context.Admins.Any())
            {
                CreatePasswordHashAndSalt(password, out byte[] passwordHash, out byte[] passwordSalt);
                Admin admin = new Admin() { Username = username, PasswordHash = passwordHash, PasswordSalt = passwordSalt };

                context.Admins.Add(admin);

                context.SaveChanges();
            }
        }

        private static void CreatePasswordHashAndSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}
