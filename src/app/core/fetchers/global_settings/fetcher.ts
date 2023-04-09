import {Injectable} from "@angular/core";
import {Request} from "../base.";
import {GlobalSettingsGetResponse} from "./responses";


@Injectable({
    providedIn: 'root'
})
export class GlobalSettingsFetcher {
    url: string = '/api/v1/external/global_settings';

    constructor(private request: Request) {
    }

    async get(): Promise<GlobalSettingsGetResponse> {
        return await (await this.request.get(this.url)).json();
    }
}
