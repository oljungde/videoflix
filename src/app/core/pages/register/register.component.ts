import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-register',
    imports: [RouterModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    @ViewChild('registerForm') registerForm?: NgForm;
    authService = inject(AuthService);

    async onSubmit() {
        console.log('Trigger registration');
        const REGISTER_DATA = {
            email: this.registerForm?.value.email,
            password1: this.registerForm?.value.password1,
            password2: this.registerForm?.value.password2,
        };
        await this.authService.registerUser(REGISTER_DATA);
        console.log('register data: ', REGISTER_DATA);
    }
}
