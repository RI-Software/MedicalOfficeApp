using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public int Age { get; set; }

        public int Months { get; set; }

        [Required]
        public int Email { get; set; }

        [Required]
        public int Phone { get; set; }

        [Required]
        public string Role { get; set; } = "user";

        // public int DeviceId { get; set; } to be releazed
    }
}
