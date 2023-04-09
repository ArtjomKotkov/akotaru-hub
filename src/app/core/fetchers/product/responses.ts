export interface ProductEntity {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbohydrate: number;
    fat: number;
    owner_id: number;
}

export interface GetProductResponse {
    entity: ProductEntity;
}

export interface ListProductResponse {
    entities: ProductEntity[];
}

export interface CreateProductResponse extends GetProductResponse {}

export interface UpdateProductResponse extends GetProductResponse {}
