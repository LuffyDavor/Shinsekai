using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize (StoreContext context, UserManager<User> userManager){

            if (!userManager.Users.Any())
            {
                var user = new User{
                    UserName= "luffydavor",
                    Email = "luffydavor@gmail.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com" 
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new [] {"Member", "Admin"});
            }

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "One Piece x Nika Luffy vs Kaido",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Nika Luffy, Kaido and One Piece!",
                    Price = 54999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/luffyvkaido-pic1.png" },
                        new Picture { Url = "/images/products/luffyvkaido-pic2.png" },
                        new Picture { Url = "/images/products/luffyvkaido-pic3.png" },
                    },
                    Brand = "Fantasy Studio",
                    Series = "One Piece",
                    QuantityInStock = 187
                },
                new Product
                {
                    Name = "One Piece x Flame Emperor Ace",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Ace and One Piece!",
                    Price = 39999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/ace-pic1.png" },
                        new Picture { Url = "/images/products/ace-pic2.png" },
                        new Picture { Url = "/images/products/ace-pic3.png" },
                    },
                    Brand = "DOD x God Studio",
                    Series = "One Piece",
                    QuantityInStock = 42
                },
                new Product
                {
                    Name = "Dragon Ball Z x Majin Buu",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Majin Buu and Dragon Ball Z!",
                    Price = 74999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/buu-pic1.png" },
                        new Picture { Url = "/images/products/buu-pic2.png" },
                        new Picture { Url = "/images/products/buu-pic3.png" },
                    },
                    Brand = "Jimei Palace",
                    Series = "Dragon Ball",
                    QuantityInStock = 21
                },
                new Product
                {
                    Name = "Chainsaw Man x Hybrid Form Denji",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Denji and Chainsaw Man!",
                    Price = 11999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/denji-pic1.png" },
                        new Picture { Url = "/images/products/denji-pic2.png" },
                        new Picture { Url = "/images/products/denji-pic3.png" },
                    },
                    Brand = "Diamond Studio",
                    Series = "Chainsaw Man",
                    QuantityInStock = 21
                },
                new Product
                {
                    Name = "Attack On Titan x Eren Yeager",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Eren and Attack on Titan!",
                    Price = 39999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/eren-pic1.png" },
                        new Picture { Url = "/images/products/eren-pic2.png" },
                        new Picture { Url = "/images/products/eren-pic3.png" },
                    },
                    Brand = "Lc Studio",
                    Series = "Attack On Titan",
                    QuantityInStock = 57
                },
                new Product
                {
                    Name = "Tokyo Ghoul x Kaneki",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Kaneki and Tokyo Ghoul!",
                    Price = 9999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/kaneki-pic1.png" },
                        new Picture { Url = "/images/products/kaneki-pic2.png" },
                        new Picture { Url = "/images/products/kaneki-pic3.png" },
                    },
                    Brand = "Three Artisan Studio",
                    Series = "Tokyo Ghoul",
                    QuantityInStock = 102
                },
                new Product
                {
                    Name = "Naruto x Sage of Six Paths Naruto",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Naruto!",
                    Price = 17999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/naruto-pic1.png" },
                        new Picture { Url = "/images/products/naruto-pic2.png" },
                        new Picture { Url = "/images/products/naruto-pic3.png" },
                    },
                    Brand = "Surge Studio",
                    Series = "Naruto",
                    QuantityInStock = 40
                },
                new Product
                {
                    Name = "Naruto x Obito Uchiha",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Naruto and Obito!",
                    Price = 17999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/obito-pic1.png" },
                        new Picture { Url = "/images/products/obito-pic2.png" },
                        new Picture { Url = "/images/products/obito-pic3.png" },
                    },
                    Brand = "Iron Curtain Studio",
                    Series = "Naruto",
                    QuantityInStock = 129
                },
                new Product
                {
                    Name = "Jujutsu Kaisen x Ryomen Sukuna",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Jujutsu Kaisen and Sukuna!",
                    Price = 19999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/sukuna-pic1.png" },
                        new Picture { Url = "/images/products/sukuna-pic2.png" },
                        new Picture { Url = "/images/products/sukuna-pic3.png" },
                    },
                    Brand = "Three Artisan Studio",
                    Series = "Jujutsu Kaisen",
                    QuantityInStock = 25
                },
                new Product
                {
                    Name = "One Piece x Marineford Arc Whitebeard",
                    Description ="This is a MUST OWN statue for ANY lover or fan of Whitebeard and One Piece!",
                    Price = 39999,
                    Pictures = new List<Picture>
                    {
                        new Picture { Url = "/images/products/whitebeard-pic1.png" },
                        new Picture { Url = "/images/products/whitebeard-pic2.png" },
                        new Picture { Url = "/images/products/whitebeard-pic3.png" },
                    },
                    Brand = "Lightning Studio",
                    Series = "One Piece",
                    QuantityInStock = 79
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}