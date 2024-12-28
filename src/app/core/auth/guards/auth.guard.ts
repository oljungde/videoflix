import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const IS_USER_AUTHENTICATED: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    const ROUTER = inject(Router);
    const ACCESS_TOKEN = localStorage.getItem('access_token');

    if (ACCESS_TOKEN) {
        return true;
    } else {
        return ROUTER.parseUrl('/login');
    }
};
