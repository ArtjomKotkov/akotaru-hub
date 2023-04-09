import {Injectable} from "@angular/core";
import {AuthFetcher} from "../../fetchers";
import {AuthTokenPayload, TelegramLoginData} from "./models";
import {CookieService} from "ngx-cookie-service";
import {AuthPayloadRepository} from "./repository";
import {GlobalSettingsRepository} from "../global_settings";
import {BehaviorSubject, combineLatest, filter, map, Observable} from "rxjs";
import {isNull, isUndefined} from "lodash-es";
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    updateTrigger$ = new BehaviorSubject<boolean>(true);

    constructor(
        private authFetcher: AuthFetcher,
        private cookieService: CookieService,
        private authPayloadRepository: AuthPayloadRepository,
        private globalSettingsRepository: GlobalSettingsRepository,
        private router: Router,
    ) {
    }

    boundWidget() {
        //@ts-ignore
        window['loginViaTelegram'] = this.login.bind(this);
    }

    init(): void {
        combineLatest([
            this.globalSettingsRepository.settings$.pipe(filter(Boolean)),
            this.updateTrigger$,
        ]).subscribe(([settings, _]) => {
            const authToken = this.cookieService.get(settings.authTokenCookieName);
            if (authToken.length != 0) {
                const payload = this.decodeAuthToken(authToken);
                this.authPayloadRepository.update(payload);
            } else {
                this.authPayloadRepository.update(null);
            }
        });
    }

    async login(data: TelegramLoginData) {
        await this.authFetcher.auth(data);
        this.updateTrigger$.next(true);
        this.router.navigate(['/hub']);
    }

    isLogged(): Observable<boolean> {
        return this.authPayloadRepository.payload$.pipe(
            filter(payload => !isUndefined(payload)),
            map(payload => {
                if (isNull(payload)) {
                    return false;
                }

                // @ts-ignore
                return new Date(payload.expiresIn * 1000) > new Date();
            })
        )
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
