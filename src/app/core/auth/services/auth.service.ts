import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ENVIRONMENT } from '../../../../environments/environment';
import { LoginResponse, User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    route = inject(ActivatedRoute);
    router = inject(Router);
    environment = ENVIRONMENT;
    #userSignal = signal<User | null>(null);
    user = this.#userSignal.asReadonly();

    async ngOnInit() {
        this.getTokensFromUrl();
        const USER = localStorage.getItem('access_token');
        if (USER) {
            // this.#userSignal.set(USER);
            // this.router.navigate(['/dashboard']);
        }
    }

    getTokensFromUrl() {
        debugger;
        this.route.queryParams.subscribe((params) => {
            const REFRESH_TOKEN = params['refresh_token'];
            const ACCESS_TOKEN = params['access_token'];
            if (REFRESH_TOKEN) {
                localStorage.setItem('refresh_token', REFRESH_TOKEN);
            }
            if (ACCESS_TOKEN) {
                localStorage.setItem('access_token', ACCESS_TOKEN);
            }
            if (ACCESS_TOKEN) {
                this.router.navigate(['/dashboard']);
            }
        });
    }

    async registerUser(registerData: { email: string; password1: string; password2: string }) {
        const REGISTER_RESPONSE = this.http.post<User>(`${this.environment.apiUrl}/auth/register/`, registerData);
        const REG = await lastValueFrom(REGISTER_RESPONSE);
        return REG;
    }

    async loginUser(loginData: { email: string; password: string }) {
        const LOGIN_RESPONSE = this.http.post<LoginResponse>(`${this.environment.apiUrl}/auth/login/`, loginData);
        const LOGIN = await firstValueFrom(LOGIN_RESPONSE);
        if (LOGIN.access && LOGIN.refresh && LOGIN.user) {
            localStorage.setItem('access_token', LOGIN.access);
            localStorage.setItem('refresh_token', LOGIN.refresh);
            this.#userSignal.set(LOGIN.user);
        }
        return LOGIN;
    }
}
