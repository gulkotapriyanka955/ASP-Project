
import { AbstractControl, ValidationErrors } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export class Validator {
  // comparing two passwords from the form
  static passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const pwd = control.get('password')?.value || '';
      const cpwd = control.get('confirmPassword')?.value || '';

      const condition = (pwd !== cpwd);

      return condition ? { passwordValidator: true } : null;
    };
  }

  // password strength valiation
  static createPasswordStrengthValidator() {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const hasCharacter = /[$&+,:;=?@#|'<>.^*()%!-]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasCharacter;

      return !passwordValid ? { passwordStrength: true } : null;
    }
  }
}