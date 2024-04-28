using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class City:BaseEntity
    {
       
        public string? Name { get; set; }

        [Required]
        public string? Country { get; set; }
        public DateTime? LastUpdatedOn { get; set; }

        public int?  LastUpdatedby { get; set; }

    }
}
