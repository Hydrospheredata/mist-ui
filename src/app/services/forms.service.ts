import { Injectable } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Injectable()
export class FormsService {

  private _VALIDATION_PATTERNS = {
    text: /[a-zA-Z]+/,
    number: /^[0-9]+$/,
    textAndNumber: /[a-zA-Z0-9]+/,
    name: /[a-zA-Z_-]+/,
    durationInSeconds: /([0-9]+s)+|Inf/
  };

  private _MESSAGES = {
    ERRORS: {
      forms: {
        addFunction: {
          name: {
            'required': 'Name is required.'
          },
          path: {
            'required': 'Path is required.'
          },
          className: {
            'required': 'Class is required.'
          },
          context: {
            'required': 'Context is required.'
          }
        },
        runJob: {
          executeParams: {
            'json': 'JSON in not valid'
          },
        },
        addContext: {
          streamingDuration: {
            'pattern': 'It is not correct duration format. Expected format "10s" or "Inf"',
            'required': 'Streaming Duration is required.'
          },
          downtime: {
            'pattern': 'It is not correct downtime format. Expected format "10s" or "Inf"',
            'required': 'Downtime is required.'
          },
          maxJobs: {
            'pattern': 'It is not correct Max Jobs format. Expected format number',
            'required': 'Max Jobs is required.'
          },
          sparkConfKey: {
            'required': 'Spark Config Key is required.'
          },
          sparkConfValue: {
            'required': 'Spark Config Value is required.'
          },
          runOptions: {
            'required': 'Run Options is required.'
          },
          name: {
            'required': 'Name is required.'
          }
        }
      }
    }
  };

  constructor() { }

  get VALIDATION_PATTERNS () {
    return this._VALIDATION_PATTERNS;
  }

  get MESSAGES () {
    return this._MESSAGES;
  }

  public setErrors(form, formErrors: object, validationMessages: object) {
    if (!form) { return; }

    for (const field in formErrors) {
      // clear previous error message (if any)
      const control = form.get(field);
      if (control) {
        formErrors[field] = '';
      }

      if (control instanceof FormArray) {
        this.setErrors(control.controls[0], formErrors, validationMessages);
      }

      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key in control.errors) {
          formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
