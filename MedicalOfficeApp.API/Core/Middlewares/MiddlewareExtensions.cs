using Microsoft.AspNetCore.Builder;

namespace MedicalOfficeApp.API.Core.Middlewares
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseHeadersForwarding (this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthMiddleware>();
        }
    }
}
