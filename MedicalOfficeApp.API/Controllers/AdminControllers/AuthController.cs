using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Data.Repositories.AuthRepo;
using MedicalOfficeApp.API.Dtos.AdminDtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MedicalOfficeApp.API.Controllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;
        private readonly IOptions<AuthSettings> authOptions;

        public AuthController(
            IAuthRepository repo,
            IOptions<AuthSettings> authOptions)
        {
            this.repo = repo;
            this.authOptions = authOptions;
        }
        
        [HttpPost(Name = "login")]
        public async Task<IActionResult> Login(AdminDto admin)
        {
            var adminFromRepo = await repo.Login(admin.Username, admin.Password);

            if (adminFromRepo == null)
                return Unauthorized();

            string token = GenerateToken();

            return Ok(token);
        }

        private string GenerateToken()
        {
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim("role", "admin"));

            TimeSpan tokenLifetime = authOptions.Value.AdminTokenLifetime;

            return authOptions.Value.GenerateToken(claims, tokenLifetime);
        }
    }
}
