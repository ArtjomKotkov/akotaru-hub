import {Injectable} from "@angular/core";
import {AuthFetcher} from "../../fetchers";
import {AuthTokenPayload, TelegramLoginData} from "./models";
import {CookieService} from "ngx-cookie-service";
import {GlobalSettingsQuery} from "../global_settings";
import {AuthPayloadRepository} from "./repository";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private authFetcher: AuthFetcher,
        private cookieService: CookieService,
        private globalSettingsQuery: GlobalSettingsQuery,
        private authPayloadRepository: AuthPayloadRepository,
    ) {
    }

    boundWidget() {
        //@ts-ignore
        window['loginViaTelegram'] = this.login.bind(this);
    }

    init(): void {
        const globalSettings = this.globalSettingsQuery.getValue();
        console.log('globalSettings', globalSettings)
        const authToken = this.cookieService.get(globalSettings.authTokenCookieName);
        console.log(globalSettings.authTokenCookieName, authToken)
        if (authToken.length != 0) {
            const payload = this.decodeAuthToken(authToken);
            this.authPayloadRepository.update(payload);
        }
    }

    async login(data: TelegramLoginData) {
        await this.authFetcher.auth(data);
        this.init();
    }

    checkLogin(): void {
        const authToken = this.authPayloadRepository.getValue();
        if (!authToken) {
            throw new Error('unauthenticated')
        }

        if (new Date(authToken.expiresIn) < new Date()) {
            throw new Error('auth_token-expired')
        }
    }

    private decodeAuthToken(token: string): AuthTokenPayload {
        const payload_part = token.split('.')[1];
        const json_paload = atob(payload_part);
        const payload = JSON.parse(json_paload);

        return {
            id: payload.id,
            role: payload.role,
            expiresIn: payload.expires_in,
        }
    }
}
