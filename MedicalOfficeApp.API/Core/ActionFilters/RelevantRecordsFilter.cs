using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Core.ActionFilters
{
    public class RelevantRecordsFilter : IAsyncActionFilter
    {
        private readonly IOptions<AuthSettings> authOptions;
        private readonly IOptions<DateRecordCollection> recordsInMemory;

        public RelevantRecordsFilter(
            IOptions<AuthSettings> authOptions,
            IOptions<DateRecordCollection> recordsInMemory)
        {
            this.authOptions = authOptions;
            this.recordsInMemory = recordsInMemory;
        }


        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            TimeSpan timeToRegister = authOptions.Value.TokenLifeTime;

            var recordsToBeDeleted = recordsInMemory
                .Value
                .Records.RemoveAll(r => r.TimeCreated < DateTime.Now.Add(-timeToRegister));

            await next();
        }
    }
}
