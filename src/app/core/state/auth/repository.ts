import {AuthTokenPayloadState} from "./models";
import {createStore, select, withProps} from '@ngneat/elf';
import {Injectable} from "@angular/core";


const authPayloadStore = createStore(
    {name: 'auth-payload'},
    withProps<AuthTokenPayloadState>({payload: undefined})
);


@Injectable({
    providedIn: 'root'
})
export class AuthPayloadRepository {
    payload$ = authPayloadStore.pipe(select((state) => state.payload));

    update(payload: AuthTokenPayloadState['payload']): void {
        authPayloadStore.update((state) => ({
            payload,
        }))
    }

    getValue(): AuthTokenPayloadState['payload'] {
        return authPayloadStore.getValue().payload;
    }
}
