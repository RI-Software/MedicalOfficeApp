using System.ComponentModel.DataAnnotations;

namespace MedicalOfficeApp.API.Dtos
{
    public class ClientDto
    {
        [Required]
        [RegularExpression(@"^(([A-Z]{0,1}[a-z]*)|([А-Я]{0,1}[а-я]*))( {0,5}?)$")]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^(([A-Z]{0,1}[a-z]*)|([А-Я]{0,1}[а-я]*))( {0,5}?)$")]
        public string Surname { get; set; }

        [Required]
        [Range(0, 120)]
        public int Age { get; set; }

        [Range(1, 11)]
        public int? Months { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^\+?(((375|80)(((17|25|33|44)[0-9]{7})|(29([1-3]|[5-9])[0-9]{6})))|(48[1-9]{9}))$")]
        public string Phone { get; set; }
    }
}
