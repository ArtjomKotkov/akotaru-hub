import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./core";
import {map} from "rxjs";


export const canAccessHub: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    console.log('canAccessHub')

    return authService.isLogged().pipe(
        map(decision => {
            if (!decision) {
                router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
            }
            return decision;
        })
    )
};

export const canAccessAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    console.log('canAccessAuth')

    return authService.isLogged().pipe(
        map(decision => {

            decision = !decision;

            if (!decision) {
                router.navigate(['/hub']);
            }
            return decision;
        })
    )
};
