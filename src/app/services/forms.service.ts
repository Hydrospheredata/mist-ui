import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class FormsService {

  constructor() { }

  public setErrors(form: FormGroup, formErrors: object, validationMessages: object) {
    if (!form) { return; }

    for (const field in formErrors) {
      // clear previous error message (if any)
      formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key in control.errors) {
          formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
