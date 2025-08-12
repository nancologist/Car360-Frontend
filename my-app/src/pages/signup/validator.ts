import {AbstractControl, ValidatorFn} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const verifyPassword = control.get('verifyPassword')?.value;

    if (password && verifyPassword && verifyPassword !== password) {
        return {passwordMismatch: true}
    }
    return null;
}
