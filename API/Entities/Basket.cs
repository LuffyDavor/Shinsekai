using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; } 
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            // CHECKS IF THE PRODUCT ALREADY EXISTS IN THE BASKET - IF NOT, ADD NEW PRODUCT
            if (!Items.Any(item => item.ProductId == product.Id)) 
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity }); 
            }

            // UPDATES THE QUANTITY OF THE EXISTING BASKET ITEM IF THE PRODUCT IS FOUND
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity; 
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            // FINDS THE ITEM - IF NULL RETURN
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;

             // UPDATES THE QUANTITY OF THE EXISTING BASKET ITEM - IF THE QUANTITY IS 0, REMOVE
            item.Quantity -= quantity;
            if(item.Quantity == 0)
            {
                Items.Remove(item);
            } 
        }
    }
}
