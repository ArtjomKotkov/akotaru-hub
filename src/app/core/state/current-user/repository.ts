import {createStore, select, withProps} from '@ngneat/elf';
import {Injectable} from "@angular/core";
import {CurrentUserState} from "./model";


const currentUserStore = createStore(
    {name: 'current-user'},
    withProps<CurrentUserState>({user: undefined})
);


@Injectable({
    providedIn: 'root'
})
export class CurrentUserRepository {
    user$ = currentUserStore.pipe(select((state) => state.user));

    update(user: CurrentUserState['user']): void {
        currentUserStore.update((state) => ({
            user,
        }))
    }

    getValue(): CurrentUserState['user'] {
        return currentUserStore.getValue().user;
    }
}
