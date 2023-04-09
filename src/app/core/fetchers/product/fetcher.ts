import {Injectable} from "@angular/core";
import {Request} from "../base.";
import {
    GetProductResponse,
    ListProductResponse,
    CreateProductResponse,
    UpdateProductResponse
} from "./responses";
import {
    GetProductRequest,
    ListProductRequest,
    CreateProductRequest,
    UpdateProductRequest,
    DeleteProductRequest
} from "./requests";


@Injectable({
    providedIn: 'root'
})
export class ProductFetcher {
    url: string = '/api/v1/hub/products';

    constructor(private request: Request) {
    }

    async get(request: GetProductRequest): Promise<GetProductResponse> {
        const request_ = await this.request.get(`${this.url}/${request.id}`);
        return await request_.json();
    }

    async list(request: ListProductRequest): Promise<ListProductResponse> {
        const query = new URLSearchParams();
        query.append('owner_id', String(request.onwerId));

        const request_ = await this.request.get(`${this.url}?${query.toString()}`);
        return await request_.json();
    }

    async create(request: CreateProductRequest): Promise<CreateProductResponse> {
        const request_ = await this.request.post(this.url, request);
        return await request_.json();
    }

    async update(request: UpdateProductRequest): Promise<UpdateProductResponse> {
        const request_ = await this.request.post(`${this.url}/${request.id}`, request);
        return await request_.json();
    }

    async delete(request: DeleteProductRequest): Promise<void> {
        await this.request.delete(`${this.url}/${request.id}`);
    }
}
