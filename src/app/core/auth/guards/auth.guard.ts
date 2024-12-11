import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const IS_USER_AUTHENTICATED: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const AUTH_SERVICE = inject(AuthService);
    const ROUTER = inject(Router);

    if (AUTH_SERVICE.isLoggedIn()) {
        return true;
    } else {
        return ROUTER.parseUrl('/login');
    }
};
