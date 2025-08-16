import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ApiService} from '../../api/api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
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

    constructor(private apiService: ApiService, private tokenService: TokenService) {
    }

    onSubmit(form: NgForm) {
        const data: LoginRequest = {
            username: form.value.username,
            password: form.value.password
        }
        this.apiService.login(data).subscribe(res => {
            console.log(res);
        })
    }
}
