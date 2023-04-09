import {Injectable} from "@angular/core";

import {
    ProductFetcher,
    GetProductRequest,
    ListProductRequest,
    CreateProductRequest,
    UpdateProductRequest,
    DeleteProductRequest,
    ProductEntity,
} from "../../fetchers";

import {Product} from "./models";


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(
        private productFetcher: ProductFetcher,
    ) {}

    async get(request: GetProductRequest): Promise<Product> {
        const result = await this.productFetcher.get(request);
        return this.parseResponse(result.entity);
    }

    async list(request: ListProductRequest): Promise<Product[]> {
        const result = await this.productFetcher.list(request);
        return result.entities.map(this.parseResponse);
    }

    async create(request: CreateProductRequest): Promise<Product> {
        const result = await this.productFetcher.create(request);
        return this.parseResponse(result.entity);
    }

    async update(request: UpdateProductRequest): Promise<Product> {
        const result = await this.productFetcher.update(request);
        return this.parseResponse(result.entity);
    }

    async delete(request: DeleteProductRequest): Promise<void> {
        await this.productFetcher.delete(request);
    }

    private parseResponse(entity: ProductEntity): Product {
        return {
            id: entity.id,
            name: entity.name,
            calories: entity.calories,
            protein: entity.protein,
            carbohydrate: entity.carbohydrate,
            fat: entity.fat,
            ownerId: entity.owner_id,
        }
    }
}
