import {Store, StoreConfig} from '@datorama/akita';
import {GlobalSettings} from "./models";
import {Injectable} from "@angular/core";


const initialSettings: GlobalSettings = {
    refreshTokenCookieName: '',
    authTokenCookieName: '',
    authTokenExpiresIn: 0,
    refreshTokenExpiresIn: 0,
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({name: 'global-settings'})
export class GlobalSettingsStore extends Store<GlobalSettings> {
    constructor() {
        super(initialSettings);
    }
}
