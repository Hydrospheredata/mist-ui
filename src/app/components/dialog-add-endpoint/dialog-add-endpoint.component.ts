import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder, NgModel } from '@angular/forms';
import { reject } from "q";
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
  private endpointForm: FormGroup;
  private file: File;
  // private endpointStore: EndpointStore;
  private formErrors = {
    name: '',
    path: ''
  };

  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<DialogAddEndpointComponent>, private FormsService: FormsService, private endpointStore: EndpointStore) {

  }

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
