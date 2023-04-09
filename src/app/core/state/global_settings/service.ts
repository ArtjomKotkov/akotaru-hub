import {Injectable} from "@angular/core";
import {GlobalSettingsFetcher, GlobalSettingsGetResponse} from "../../fetchers";

import {GlobalSettings} from "./models";
import {GlobalSettingsRepository} from "./repository";


@Injectable({
    providedIn: 'root'
})
export class GlobalSettingsService {

    constructor(
        private globalSettingsFetcher: GlobalSettingsFetcher,
        private globalSettingsRepository: GlobalSettingsRepository,
    ) {
    }

    async init() {
        await this.get();
    }

    private async get(): Promise<void> {
        const result = await this.globalSettingsFetcher.get();
        this.globalSettingsRepository.update(this.parseResponse(result))
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
