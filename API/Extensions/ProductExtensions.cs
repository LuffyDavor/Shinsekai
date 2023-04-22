using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm){
            if (string.IsNullOrWhiteSpace(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }
        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string series){
            
            var brandList = new List<string>();
            var seriesList = new List<string>();

            if (!string.IsNullOrEmpty(brands)){
                
                brandList.AddRange(brands.ToLower().Split(",").ToList());
            }
            if (!string.IsNullOrEmpty(series)){

                seriesList.AddRange(series.ToLower().Split(",").ToList());
            }

            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => seriesList.Count == 0 || seriesList.Contains(p.Series.ToLower()));

            return query;
        }
    }
}