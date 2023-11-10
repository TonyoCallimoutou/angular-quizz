import {AbstractControl, ValidationErrors} from "@angular/forms";

export function ValidatorPassword(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const verifyPassword = control.get('verifyPassword');

  if (!!password?.value && !!verifyPassword?.value && password.value !== verifyPassword.value) {
    verifyPassword.setErrors({notSame: true});
  }
  return null;
}
