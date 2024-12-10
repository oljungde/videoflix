import { Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
];
