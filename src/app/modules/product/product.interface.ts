// Product type
export type TProduct = {
    name: string;
    brand: string;
    model: string;
    price: number;
    type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";
    description: string;
    quantity: number;
    inStock: boolean;
}

// Update Product Type 
export type TUpdateProductData = {
    name?: string;
    brand?: string;
    model?: string;
    price?: number;
    type?: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
    description?: string;
    quantity?: number;
    inStock?: boolean;
}