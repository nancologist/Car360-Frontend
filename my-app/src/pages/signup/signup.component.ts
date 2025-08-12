import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {InputComponent} from '../../components/input/input.component';
import {MatButton} from '@angular/material/button';

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
        username: new FormControl('', { nonNullable: true }),
        email: new FormControl('', { nonNullable: true }),
        password: new FormControl('', { nonNullable: true }),
        verifyPassword: new FormControl('', { nonNullable: true })
    });

    onSubmit() {
        console.log(this.signupForm.value)
    }
}
