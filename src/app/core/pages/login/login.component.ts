import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

    async onSubmit() {
        console.log('Login');
        const LOGIN_DATA = {
            email: this.loginForm?.value.email,
            password: this.loginForm?.value.password,
        };
        console.log('login data: ', LOGIN_DATA);
        await this.authService.loginUser(LOGIN_DATA);
    }
}
