using AutoMapper;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Core.WorkingDaysCollection;
using MedicalOfficeApp.API.Data;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace MedicalOfficeApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IRecordRepository, RecordRepository>();
            services.AddSingleton<DateRecordCollection>();
            services.Configure<WorkingDaysCollection>(Configuration.GetSection("WorkingHours"));
            services.Configure<WorkingDaysCollection>((opt) => 
            {

                opt.InitialSetUp();
                //foreach (var day in opt.WorkingDays)
                //{
                //    day.AllowedTime = new List<TimeSpan>();

                //    for (TimeSpan i = day.Start; i < day.Stop; i += opt.TimePerClient)
                //    {
                //        day.AllowedTime.Add(i);
                //    }
                //}
            });
            services.AddAutoMapper(typeof(RecordRepository).Assembly);
            services.AddControllers().AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling =
                    ReferenceLoopHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
