import { Routes } from '@angular/router';
import { IS_USER_AUTHENTICATED } from './core/auth/guards/auth.guard';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ConfirmAccountComponent } from './core/pages/confirm-account/confirm-account.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [IS_USER_AUTHENTICATED],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'confirm-account',
        component: ConfirmAccountComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [IS_USER_AUTHENTICATED],
    },
    {
        path: '**',
        redirectTo: '/',
    },
];
