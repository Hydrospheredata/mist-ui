import { Component, OnInit, Inject, HostListener, InjectionToken } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { FunctionInfo } from '@models/function';
import { FunctionStore } from '@stores/function.store';
import { JobStore } from '@stores/job.store';
import { JSONValidator } from '@app/validators/json.validator';
import { FormsService } from '@services/forms.service';
import { MdlSnackbarService } from '@angular-mdl/core';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';
import { AlertService } from '@services/alert.service';

import {
  DialogFullScreenJsonComponent,
  injectableJsonString
} from '@components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

export let injectableSelectedFunction = new InjectionToken<FunctionInfo>('selectedFunction');

@Component({
  selector: 'mist-dialog-job-form',
  templateUrl: './dialog-job-form.component.html',
  styleUrls: ['./dialog-job-form.component.scss'],
  providers: [FormsService, MdlSnackbarService, AlertService]
})

export class DialogJobFormComponent implements OnInit {
  public jobForm: FormGroup;
  data: FunctionInfo;
  functions: FunctionInfo[];
  selectedFunction: FunctionInfo;
  codeMirrorOptions: {};
  executeParams: string;
  public formErrors: object = {
    executeParams: ''
  };
  public requestBody: string;
  private port: string;
  private apiUrl: string;

  constructor(
    @Inject(injectableSelectedFunction) data: FunctionInfo,
    private functionStore: FunctionStore,
    private jobStore: JobStore,
    private fb: FormBuilder,
    private formsService: FormsService,
    private mdlSnackbarService: MdlSnackbarService,
    private location: Location,
    public dialogRef: MdlDialogReference,
    private alertService: AlertService,
    private dialog: MdlDialogService,
  ) {

    this.data = data;
    this.selectedFunction = this.data || new FunctionInfo({});
    this.port = environment.production ? window.location.port : environment.port;
    const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
    this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}${path}`;
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  ngOnInit() {
    const fs = this.formsService;
    this.functionStore.functions.subscribe(data => { this.functions = data });
    if (this.selectedFunction && this.selectedFunction.executeExample) {
      this.executeParams = this.selectedFunction.executeExample();
    }
    this.buildCodeMirrorOptions();
    this.createJobForm();
    this.jobForm.valueChanges
      .subscribe(form => {
        if (!this.jobForm.invalid) {
          let executeParams = this.executeParams || '{}';
          const id = this.selectedFunction && this.selectedFunction.name ? this.selectedFunction.name : 'overview';

          try {
            executeParams = JSON.stringify(JSON.parse(executeParams));
          } catch (error) {
            fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
            return;
          }

          fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
          this.requestBody = `curl -X POST -d '${executeParams}' '${this.apiUrl}/functions/${id}/jobs'`;
        }
      });
  }

  createJobForm() {
    this.jobForm = this.fb.group({
      executeParams: ['', [JSONValidator.validate]],
      selectedFunction: ['']
    })
  }

  onChangeFunction() {
    this.executeParams = this.selectedFunction.executeExample() || '{}';
  }

  openFullScreenJson(jsonString: string) {
    if (typeof jsonString === 'object') {
      jsonString = JSON.stringify(jsonString);
    }
    this.dialog.showCustomDialog({
      component: DialogFullScreenJsonComponent,
      styles: { 'width': '100%', 'height': '100%' },
      providers: [{ provide: injectableJsonString, useValue: jsonString }],
    });
  }

  submit(form) {
    let fs = this.formsService;
    let functionId = this.selectedFunction.name;
    let params = this.executeParams || '{}';

    if (form.valid) {
      this.jobStore.add(functionId, params)
        .subscribe((id) => {
          this.dialogRef.hide();
          this.mdlSnackbarService.showSnackbar({
            message: `Job ${id} initialisation was successful`,
            timeout: 5000
          });
          console.log(`init job ${id}`);
        }, (error) => {
          this.alertService.error(error);
        });
    } else {
      fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
      return false
    }
  }

  private buildCodeMirrorOptions() {
    this.codeMirrorOptions = {
      placeholder: 'Parameters...',
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true
    }
  }

  copiedToClipBoardSuccessfully(inputTarget) {
    this.mdlSnackbarService.showSnackbar({
      message: `CURL params were copied out to clipboard successfully`,
      timeout: 5000
    });
  }

}


