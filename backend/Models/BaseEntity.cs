namespace backend.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }

        public DateTime LastUpdatedOn { get; set; } = DateTime.Now;

        public int LastUpdatedby { get; set; }
    }
}
