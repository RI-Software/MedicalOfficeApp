using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace MedicalOfficeApp.API.Core
{
    public class AuthSettings
    {
        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string Secret { get; set; }

        public TimeSpan TokenLifeTime { get; set; }

        public SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret));
    }
}
