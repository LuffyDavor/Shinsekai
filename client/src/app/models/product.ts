export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictures: Picture[];
    series: string;
    brand: string;
    quantityInStock?: number;
}

export interface Picture {
    id: number;
    url: string;
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    brands: string[];
    series: string[];
    pageNumber: number;
    pageSize: number;
}
