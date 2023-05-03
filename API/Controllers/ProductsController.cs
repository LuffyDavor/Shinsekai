using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ProductDto>>> GetProducts([FromQuery]ProductParams productParams)
        {
            // Include the related pictures when fetching products
            var query = _context.Products.Include(p => p.Pictures)
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Series)
                .AsQueryable();

            // Execute the query to get the products
            var products = await PagedList<Product>.ToPagedList(query,
                productParams.PageNumber,
                productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            // Map the products to ProductDto
            var productDtos = products.Select(p => MapToProductDto(p)).ToList();

            // Map the paged list to PagedList<ProductDto>
            var pagedProductDtos = new PagedList<ProductDto>(productDtos, products.MetaData.TotalCount,
                products.MetaData.CurrentPage, products.MetaData.PageSize);

            return pagedProductDtos;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            // Include the related pictures when fetching a single product
            var product = await _context.Products.Include(p => p.Pictures).SingleOrDefaultAsync(p => p.Id == id);

            if (product == null) return NotFound();

            // Map the product to ProductDto
            var productDto = MapToProductDto(product);

            return productDto;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var series = await _context.Products.Select(p => p.Series).Distinct().ToListAsync();

            return Ok(new {brands, series});
        }

        private static ProductDto MapToProductDto(Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Pictures = product.Pictures.Select(pic => new PictureDto { Id = pic.Id, Url = pic.Url }).ToList(),
                Brand = product.Brand,
                Series = product.Series,
                QuantityInStock = product.QuantityInStock
            };
        }

    }
}
