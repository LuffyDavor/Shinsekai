using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<ActionResult<List<ProductDto>>> GetProducts()
        {
            // Include the related pictures when fetching products
            var products = await _context.Products.Include(p => p.Pictures).ToListAsync();

            // Map the products to ProductDto
            var productDtos = products.Select(p => MapToProductDto(p)).ToList();

            return productDtos;
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
