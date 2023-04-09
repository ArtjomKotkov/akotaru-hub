export interface GetProductRequest {
    id: string;
}


export interface ListProductRequest {
    onwerId: number | null;
}

export interface CreateProductRequest {
    name: string;
    calories: number;
    protein: number;
    carbohydrate: number;
    fat: number;
}

export interface UpdateProductRequest {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbohydrate: number;
    fat: number;
}

export interface DeleteProductRequest {
    id: string;
}

