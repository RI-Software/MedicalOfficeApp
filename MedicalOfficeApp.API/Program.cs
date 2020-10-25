using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace MedicalOfficeApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IHost host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var context = services.GetRequiredService<DataContext>();
                var numOfDaysOfPreservation = services
                    .GetRequiredService<IOptions<BookingSettings>>()
                    .Value
                    .NumOfDaysOfPreservationHistory;

                context.Database.Migrate();
                Seed.SeedRecordsAndClients(context);
                Seed.DeleteOldRecords(context, numOfDaysOfPreservation);
                Seed.SeedAdmin(context, "kwetachka", "password");
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingConfig, config) =>
                {

                    config.AddJsonFile("bookingsettings.json",
                       optional: false,
                       reloadOnChange: true);

                    config.AddJsonFile("devsecrets.json",
                        optional: true,
                        reloadOnChange: true);

                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
