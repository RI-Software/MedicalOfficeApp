using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Models
{
    public class Client
    {
        [Key]
        public int ClientId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public int Age { get; set; }

        public int? Months { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        // public int DeviceId { get; set; } to be releazed
    }
}