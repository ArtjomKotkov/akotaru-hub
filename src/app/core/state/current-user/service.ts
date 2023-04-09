import {Injectable} from "@angular/core";
import {AuthPayloadRepository} from "../auth";
import {CurrentUserRepository} from "./repository";
import {UserFetcher} from "../../fetchers";
import {GetUserResponse} from "../../fetchers/user/responses";
import {CurrentUser} from "./model";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    constructor(
        private authPayloadRepo: AuthPayloadRepository,
        private currentUserRepo: CurrentUserRepository,
        private userFetcher: UserFetcher,
    ) {
    }

    init(): void {
        this.authPayloadRepo.payload$.subscribe(payload =>  {
            if (payload?.id) {
                this.userFetcher.get({id: payload.id}).then(response => {
                    this.currentUserRepo.update(this.extractUser(response));
                });
            }
        })
    }

    private extractUser(response: GetUserResponse): CurrentUser {
        return {
            id: response.entity.id,
            username: response.entity.username,
            firstName: response.entity.first_name,
            lastName: response.entity.last_name,
            photoUrl: response.entity.photo_url,
            role: response.entity.role,
        }
    }

}
