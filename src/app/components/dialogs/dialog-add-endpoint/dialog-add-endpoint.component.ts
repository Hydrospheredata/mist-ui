import { Component, OnInit, HostListener } from '@angular/core';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Context } from '@models/context';
import { FormsService } from '@services/forms.service';
import { EndpointStore } from '@stores/endpoint.store';
import { ContextStore } from '@stores/context.store';
import { Endpoint } from '@models/endpoint';
import { MdlSnackbarService } from '@angular-mdl/core';
import { DialogAddContextComponent } from '@components/dialogs/dialog-add-context/dialog-add-context.component';

@Component({
  selector: 'mist-dialog-add-endpoint',
  templateUrl: './dialog-add-endpoint.component.html',
  styleUrls: ['./dialog-add-endpoint.component.scss'],
  providers: [FormsService, MdlSnackbarService]
})
export class DialogAddEndpointComponent implements OnInit {
  public endpointForm: FormGroup;
  public contexts: Context[];
  public file: File;
  public formErrors = {
    name: '',
    path: '',
    className: '',
    context: ''
  };
  public loading: boolean;
  public isCreateContextFormVisiblie: boolean;
  public currentContext: Context;

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  constructor(private fb: FormBuilder,
              public dialogRef: MdlDialogReference,
              private formsService: FormsService,
              private endpointStore: EndpointStore,
              private mdlSnackbarService: MdlSnackbarService,
              private dialog: MdlDialogService,
              private contextStore: ContextStore
              ) {}

  ngOnInit() {
    this.createEndpointFrom();
    this.contextStore.getAll();
    this.contextStore.contexts.subscribe(data => { this.contexts = data });
  }

  createEndpointFrom() {
    const fs = this.formsService;
    this.endpointForm = this.fb.group({
      name: ['', [Validators.required]],
      path: ['', [Validators.required]],
      defaultContext: ['', [Validators.required]],
      className: ['', [Validators.required]],
      file: ['']
    });

    this.endpointForm.valueChanges
      .subscribe( () => {
        fs.setErrors(this.endpointForm, this.formErrors, fs.MESSAGES.ERRORS.forms.addEndpoint);
      });

    fs.setErrors(this.endpointForm, this.formErrors, fs.MESSAGES.ERRORS.forms.addEndpoint);
  }

  submitEnpointForm(form) {
    const self = this;
    const fs = this.formsService;
    let endpoint: Endpoint = Object.create(null);
    endpoint = new Endpoint({
      name: form.controls.name.value,
      path: form.controls.path.value,
      className: form.controls.className.value,
      defaultContext: form.controls.defaultContext.value,
      file: this.file
    });

    if (form.valid) {
      this.loading = true;
      this.endpointStore.createEndpoint(endpoint)
        .subscribe(endpoint => {
          self.loading = false;
          this.dialogRef.hide();
          this.mdlSnackbarService.showSnackbar({
            message: `${endpoint.name} has been successfully added`,
            timeout: 5000
          });
        }, (error) => {
          self.loading = false;
          this.mdlSnackbarService.showSnackbar({
            message: error,
            timeout: 5000
          });
        });

    } else {
      fs.setErrors(this.endpointForm, this.formErrors, fs.MESSAGES.ERRORS.forms.addEndpoint);
      return false;
    }
  }

  showDialogContext() {
    this.dialog.showCustomDialog({
      component: DialogAddContextComponent,
      styles: {'width': '850px'},
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
    });
  }

  onFileChange($event) {
    this.file = $event.target.files[0];
  }
}
