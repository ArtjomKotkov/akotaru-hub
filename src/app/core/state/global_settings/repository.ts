import {createStore, select, withProps} from '@ngneat/elf';
import {Injectable} from "@angular/core";
import {GlobalSettingsState} from "./models";


const globalSettingsStore = createStore(
    {name: 'global-settings'},
    withProps<GlobalSettingsState>({settings: undefined})
);


@Injectable({
    providedIn: 'root'
})
export class GlobalSettingsRepository {
    settings$ = globalSettingsStore.pipe(select((state) => state.settings));

    update(settings: GlobalSettingsState['settings']): void {
        globalSettingsStore.update((state) => ({
            settings,
        }))
    }

    getValue(): GlobalSettingsState['settings'] {
        return globalSettingsStore.getValue().settings;
    }
}
