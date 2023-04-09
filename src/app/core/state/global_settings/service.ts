import {Injectable} from "@angular/core";
import {GlobalSettingsFetcher, GlobalSettingsGetResponse} from "../../fetchers";
import {GlobalSettingsStore} from "./store";
import {GlobalSettings} from "./models";


@Injectable({
    providedIn: 'root'
})
export class GlobalSettingsService {
    store = new GlobalSettingsStore();

    constructor(private globalSettingsFetcher: GlobalSettingsFetcher) {
    }

    init() {
        this.get();
    }

    private async get(): Promise<void> {
        const result = await this.globalSettingsFetcher.get();
        this.store.update(this.parseResponse(result));
    }

    private parseResponse(response: GlobalSettingsGetResponse): GlobalSettings {
        return {
            authTokenCookieName: response.entity.auth_token_cookie_name,
            refreshTokenCookieName: response.entity.refresh_token_cookie_name,
            authTokenExpiresIn: response.entity.auth_token_expires_in,
            refreshTokenExpiresIn: response.entity.refresh_token_expires_in,
        }
    }


}
