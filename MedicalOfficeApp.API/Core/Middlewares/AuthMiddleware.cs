using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Core.Middlewares
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate next;

        public AuthMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            string authHeader = context.Request.Headers["Authorization"];

            if (authHeader == null && context.Request.Method == "POST" && context.Request.HasFormContentType)
            {
                context.Request.Headers["Authorization"] = context.Request.Form["Authorization"].ToString();
            }

            await next.Invoke(context);
        }
    }
}
