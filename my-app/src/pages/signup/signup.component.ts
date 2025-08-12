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

    onSubmit() {
        if (this.signupForm.invalid) {
            // Todo: add the list of errors or add error to each field so user understand which input is wrong.
            alert("Form invalid, please adjust your input!");
            return;
        }

        console.log(this.signupForm.value)
    }
}
