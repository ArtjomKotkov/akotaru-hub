import {Injectable} from "@angular/core";

import {Request} from '../base.';
import {AuthResponse} from "./responses";


@Injectable({
    providedIn: 'root'
})
export class AuthFetcher {
    url: string = '/api/v1/external/auth';

    constructor(private request: Request) {
    }

    async auth(loginData: any): Promise<AuthResponse> {
        return await this.request.post(this.url, loginData);
    }
}
