using AutoMapper;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Core.ActionFilters;
using MedicalOfficeApp.API.Core.Middlewares;
using MedicalOfficeApp.API.Core.WorkingDaysCollection;
using MedicalOfficeApp.API.Data;
using MedicalOfficeApp.API.Data.Repositories;
using MedicalOfficeApp.API.Data.Repositories.AuthRepo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.Net;

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
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<RelevantRecordsFilter>();
            services.AddSingleton<DateRecordCollection>();
            services.Configure<BookingSettings>(Configuration.GetSection("BookingSettings"));
            services.Configure<AuthSettings>(Configuration.GetSection("Auth"));
            services.Configure<WorkingDaysCollection>(Configuration.GetSection("WorkingHours"));
            services.Configure<WorkingDaysCollection>((opt) => 
            {
                opt.InitialSetUp();
            });
            services.AddAutoMapper(typeof(RecordRepository).Assembly);
            services.AddControllers().AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.Converters
                    .Add(new Newtonsoft.Json.Converters.StringEnumConverter());

                opt.SerializerSettings.ReferenceLoopHandling =
                    ReferenceLoopHandling.Ignore;
            });
            var authOptions = Configuration.GetSection("Auth").Get<AuthSettings>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false; //only for develop
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = authOptions.Audience,

                        ValidateLifetime = true,

                        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(errorApp =>
                {
                    errorApp.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var exceptionHandlerFeature =
                            context.Features.Get<IExceptionHandlerFeature>();

                        if(exceptionHandlerFeature != null)
                        {
                            await context.Response.WriteAsync("Internal server error");
                        }
                    });
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseHeadersForwarding();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
