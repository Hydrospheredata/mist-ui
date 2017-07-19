import { Component, OnInit, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder, NgModel } from '@angular/forms';

import { FormsService } from '@services/forms.service';
import { Messages } from 'app/constants/messages';
import { EndpointStore } from '@stores/endpoint.store';
import { Endpoint } from '@models/endpoint';

@Component({
  selector: 'mist-dialog-add-endpoint',
  templateUrl: './dialog-add-endpoint.component.html',
  styleUrls: ['./dialog-add-endpoint.component.scss'],
  providers: [FormsService]
})
export class DialogAddEndpointComponent implements OnInit {
  public endpointForm: FormGroup;
  public file: File;
  public formErrors = {
    name: '',
    path: ''
  };

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  constructor(private fb: FormBuilder,
              public dialogRef: MdlDialogReference,
              private FormsService: FormsService,
              private endpointStore: EndpointStore) {}

  ngOnInit() {
    this.createEndpointFrom();
  }

  createEndpointFrom() {
    this.endpointForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      path: ['', [Validators.required, Validators.minLength(4)]],
      nameSpace: [''],
      className: [''],
      additionalParams: [''],
      file: ['']
    });

    this.endpointForm.valueChanges
      .subscribe( () => {
        this.FormsService.setErrors(this.endpointForm, this.formErrors, Messages.ERRORS.forms.addEndpoint);
      });

    this.FormsService.setErrors(this.endpointForm, this.formErrors, Messages.ERRORS.forms.addEndpoint);
  }

  submitEnpointForm(form) {
    const endpoint: Endpoint = new Endpoint({
    name: form.controls.name.value,
    lang: '',
    tags: '',
    path: form.controls.name.path,
    className: form.controls.name.className,
    nameSpace: form.controls.name.nameSpace,
    additionalParams: form.controls.name.additionalParams,
    file: this.file});

    if (form.valid) {
      this.endpointStore.createEndpoint(endpoint);
      this.dialogRef.hide();
    } else {
      this.FormsService.setErrors(this.endpointForm, this.formErrors, Messages.ERRORS.forms.addEndpoint);
      return false;
    }
  }

  onIconClick(input: NgModel) {
    console.log( input );
  }

  onFileChange($event) {
    this.file = $event.target.files[0];
  }
}
