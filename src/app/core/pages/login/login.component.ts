import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-login',
    imports: [FormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    @ViewChild('loginForm') loginForm?: NgForm;
    authService = inject(AuthService);
    router = inject(Router);

    ngOnInit() {
        this.authService.getTokensFromUrl();
        const ACCESS_TOKEN = localStorage.getItem('access_token');
        console.log(ACCESS_TOKEN);
        if (ACCESS_TOKEN) {
            console.log('User is already logged in');
        }
    }

    async onSubmit() {
        const LOGIN_DATA = {
            email: this.loginForm?.value.email,
            password: this.loginForm?.value.password,
        };
        await this.authService.loginUser(LOGIN_DATA);
        this.router.navigate(['dashboard']);
    }
}
