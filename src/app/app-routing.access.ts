import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./core";


export const canAccessHub: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    try {
        authService.checkLogin();
        return true;
    } catch (error) {
        router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
        return false;
    }
};


export const canAccessAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    try {
        authService.checkLogin();
        router.navigate(['/hub'], { queryParams: { returnUrl: state.url }});
        return false;
    } catch (error) {
        return true;
    }
};
