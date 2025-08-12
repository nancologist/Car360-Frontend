import {Component} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {InputComponent} from '../../components/input/input.component';
import {MatButton} from '@angular/material/button';
import {passwordMatchValidator} from './validator';
import {ApiService} from '../../api/api.service';
import {SignupRequest} from '../../shared';
import {Router} from '@angular/router';
import {requestWithLoadingAndError} from '../../api/helper';
import {filter} from 'rxjs';

// Todo: add verification for email
// todo: add verification that password is repeated correctly
// todo: add verification that username is not empty

@Component({
    selector: 'app-signup',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        InputComponent,
        MatButton
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {

    signupForm = new FormGroup({
        username: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email]
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(6)]
        }),
        verifyPassword: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(6)]
        })
    }, {validators: passwordMatchValidator});

    constructor(private apiService: ApiService, private router: Router) {
    }

    onSubmit() {
        if (this.signupForm.invalid
            || this.signupForm.value.username === undefined
            || this.signupForm.value.email === undefined
            || this.signupForm.value.password === undefined
        ) {
            // Todo: add the list of errors or add error to each field so user
            // understands which input is wrong.
            alert("Form invalid, please adjust your input!");
            return;
        }

        const data: SignupRequest = {
            username: this.signupForm.value.username,
            email: this.signupForm.value.email,
            password: this.signupForm.value.password
        }

        requestWithLoadingAndError(this.apiService.signUpUser(data))
            .pipe(filter(res => !res.loading))
            .subscribe((res) => {
                if (res.errMsg) {
                    alert(res.errMsg)
                    return;
                }
                alert('Your account is created, now you can log in!')
                this.router.navigate(['/login'])
            },);
    }
}
