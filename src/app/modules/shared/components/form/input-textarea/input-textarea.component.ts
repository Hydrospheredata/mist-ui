import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

const noop = (_?: any) => {};

@Component({
  selector: 'mist-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextareaComponent), multi: true },
  ]
})
export class InputTextareaComponent implements ControlValueAccessor {
  protected _value: any;
  protected onChange: (_: any) => void = noop;
  protected onTouched: () => void = noop;

  @Input() public label = '';
  @Input() public name = '';
  @Input() public placeholder = '';
  @Input() public className = '';
  @Input() public errors: any;

  constructor() { }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  public writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
    }
  }

  public registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  public hasErrors(input: NgModel): boolean {
    return input.touched && this.errors != null;
  }
}
