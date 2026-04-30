import { AsyncValidatorFn, FormControl, ValidatorFn, Validators as V } from '@angular/forms';

// teh need in dis validators is teh non-trimming angular standard behavior
// see https://github.com/angular/angular/issues/8503
/**
 *  CustomValidators is extended version of angualr default validation class.
 *  The only change is in this calss is we trim the value before validation.
 */
export class CustomValidators {

    static required(control: FormControl) {
        if (!control.value || typeof control.value === 'string' && !control.value.trim()) {
            return {
                required: true,
            };
        }
        return undefined;
    }

    static minLength(length: number): ValidatorFn {
        return (control: FormControl) => {
            if (!control.value || typeof control.value === 'string' && control.value.trim().length < length) {
                return {
                    minlength: true,
                };
            }

            return undefined;
        };
    }

    static maxLength(length: number): ValidatorFn {
        return (control: FormControl) => {
            if (control.value && typeof control.value === 'string' && control.value.trim().length > length) {
                return {
                    maxlength: true,
                };
            }

            return undefined;
        };
    }

    static pattern(pattern): ValidatorFn {
        return V.pattern(pattern);
    }

    static minAmount(amount: number): ValidatorFn {
        return (control: FormControl) => {
            if (control.value && control.value.length < amount) {
                return {
                    minamount: true,
                };
            }

            return undefined;
        };
    }

    static maxAmount(amount: number): ValidatorFn {
        return (control: FormControl) => {
            if (control.value && control.value.length > amount) {
                return {
                    maxamount: true,
                };
            }

            return undefined;
        };
    }

    static compose(validators: ValidatorFn[]): ValidatorFn {
        return V.compose(validators);
    }

    static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn {
        return V.composeAsync(validators);
    }

}
