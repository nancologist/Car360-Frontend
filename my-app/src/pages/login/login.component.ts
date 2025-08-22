import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ApiService} from '../../api/api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {LoginRequest} from '../../shared';
import {TokenService} from '../../services/token.service';

@Component({
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButton, RouterLink]
})
export class LoginComponent {
    username = ""
    password = ""

    constructor(
        private apiService: ApiService,
        private tokenService: TokenService,
        private router: Router
    ) {
    }

    onSubmit(form: NgForm) {
        const data: LoginRequest = {
            username: form.value.username,
            password: form.value.password
        };
        // LoginResponse in backend has the according type inside the
        // feature branch.
        // this.apiService.login(data).subscribe((res: LoginResponse) => {
        //     this.tokenService.setToken(res.token);
        //     this.router.navigate(['/'])
        // });
    }
}
