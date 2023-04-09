import {Query} from '@datorama/akita';
import {GlobalSettingsStore} from './store';
import {GlobalSettings} from "./models";
import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class GlobalSettingsQuery extends Query<GlobalSettings> {
    constructor(protected store_: GlobalSettingsStore) {
        super(store_);
    }
}
