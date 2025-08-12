import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ApiService} from '../../api/api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButton, NgIf, RouterLink]
})
export class LoginComponent {
    username: string = "Helmut"
    password: string = "123"
    loginFailed = false;

    constructor(private apiService: ApiService) {
    }

    onUsernameChanged(event: Event) {
        // console.log(this.username)
    }

    onSubmit(form: NgForm) {
        // this.apiService.postLogin(form.value).subscribe((res) => {
        //
        // })
    }
}
