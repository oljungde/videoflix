import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { ENVIRONMENT } from '../../../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    router = inject(Router);
    environment = ENVIRONMENT;
    #userSignal = signal<User | null>(null);
    user = this.#userSignal.asReadonly();
    isLoggedIn = computed(() => !!this.user());
    googleLoginUrl = `${this.environment.apiUrl}/auth/google`;

    // constructor() {
    //     this.loadUserFromStorage();
    //     this.setUserToLocaleStorage();
    // }

    // loadUserFromStorage() {
    //     const USER_JSON = localStorage.getItem(USER_STORAGE_KEY);
    //     if (USER_JSON) {
    //         const USER = JSON.parse(USER_JSON);
    //         this.#userSignal.set(USER);
    //     }
    // }

    // setUserToLocaleStorage() {
    //     effect(() => {
    //         const USER = this.user();
    //         if (USER) {
    //             localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(USER));
    //         }
    //     });
    // }

    async registerUser(registerData: { email: string; password1: string; password2: string }) {
        const REGISTER_RESPONSE = this.http.post<User>(`${this.environment.apiUrl}/auth/register/`, registerData);
        const REG = await lastValueFrom(REGISTER_RESPONSE);
        console.log('Register response: ', REG);
        return REG;
    }

    async loginUser(loginData: { email: string; password: string }) {
        console.log('trigger login in service');
        const LOGIN_RESPONSE = this.http.post<User>(`${this.environment.apiUrl}/auth/login/`, loginData);
        const LOGIN = await lastValueFrom(LOGIN_RESPONSE);
        console.log('Login response: ', LOGIN);
        // this.#userSignal.set(LOGIN);
        return LOGIN;
    }
}
