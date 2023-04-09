import {Injectable} from "@angular/core";
import {Request} from "../base.";
import {GetUserResponse} from "./responses";
import {GetUserRequest} from "./requests";


@Injectable({
    providedIn: 'root'
})
export class UserFetcher {
    url: string = '/api/v1/hub/users';

    constructor(private request: Request) {
    }

    async get(request: GetUserRequest): Promise<GetUserResponse> {
        const request_ = await this.request.get(`${this.url}/${request.id}`);
        return await request_.json();
    }
}
