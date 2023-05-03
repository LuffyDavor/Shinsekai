namespace API.DTOs
{
    public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public long Price { get; set; }
    public List<PictureDto> Pictures { get; set; }
    public string Brand { get; set; }
    public string Series { get; set; }
    public int QuantityInStock { get; set; }
}
}