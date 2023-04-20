using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;

        }



        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            // RETRIEVE OR CREATE BASKET
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();

            // ADD PRODUCT TO BASKET
            var product = await _context.Products.Include(p => p.Pictures).FirstOrDefaultAsync(p => p.Id == productId);
            if (product == null) return BadRequest(new ProblemDetails{Title = "Product Not Found!"});
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails { Title = "Problem Saving Item To Basket!" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem Removing Item From Basket!" });

        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .ThenInclude(p => p.Pictures)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString(); // GENERATE RANDOM NON REPEATABLE BUYER ID

            // COOKIE OPTIONs
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            // CREATE AND RETURN BASKET
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

private BasketDto MapBasketToDto(Basket basket)
{
    return new BasketDto
    {
        Id = basket.Id,
        BuyerId = basket.BuyerId,
        Items = basket.Items.Select(item => new BasketItemDto
        {
            ProductId = item.ProductId,
            Name = item.Product.Name,
            Price = item.Product.Price,
            PictureUrl = item.Product.Pictures.FirstOrDefault()?.Url,
            Series = item.Product.Series,
            Brand = item.Product.Brand,
            Quantity = item.Quantity
        }).ToList()
    };
}

    }
}