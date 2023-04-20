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
