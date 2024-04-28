using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Name should be ")]
        [StringLength(50,MinimumLength =2)]
        [RegularExpression(".*[a-zA-Z]+.*",ErrorMessage ="Only numerics are not allowed")]
        public string? Name { get; set; }

        [Required]
        public string? Country { get; set; }
    }
}
