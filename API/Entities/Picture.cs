using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Pictures")]
    public class Picture
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}

