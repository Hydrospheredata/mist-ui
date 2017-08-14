import { Component, OnInit, Inject, HostListener, InjectionToken } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdlDialogReference } from '@angular-mdl/core';
import { Endpoint } from '@models/endpoint';
import { EndpointStore } from '@stores/endpoint.store';
import { JobStore } from '@stores/job.store';
import { JSONValidator } from '@app/validators/json.validator';
import { FormsService } from '@services/forms.service';
import { MdlSnackbarService } from '@angular-mdl/core';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

export let injectableSelectedEndpoint = new InjectionToken<Endpoint>('selectedEndpoint');

@Component({
  selector: 'mist-dialog-job-form',
  templateUrl: './dialog-job-form.component.html',
  styleUrls: ['./dialog-job-form.component.scss'],
  providers: [FormsService, MdlSnackbarService]
})

export class DialogJobFormComponent implements OnInit {
  public jobForm: FormGroup;
  data: Endpoint;
  endpoints: Endpoint[];
  selectedEndpoint: Endpoint;
  codeMirrorOptions: {};
  executeParams: string;
  public formErrors: object = {
    executeParams: ''
  };
  private requestBody: string;
  private port: string;
  private apiUrl: string;

  constructor(
    @Inject(injectableSelectedEndpoint) data: Endpoint,
    private endpointStore: EndpointStore,
    private jobStore: JobStore,
    private fb: FormBuilder,
    private formsService: FormsService,
    private mdlSnackbarService: MdlSnackbarService,
    private location: Location,
    public dialogRef: MdlDialogReference) {

    this.data = data;
    this.port = environment.production ? window.location.port : environment.port;
    const path = this.location.prepareExternalUrl(environment.apiUrl).replace("/ui" + environment.apiUrl, environment.apiUrl);
    this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}${path}`;
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  ngOnInit() {
    const fs = this.formsService;
    this.selectedEndpoint = this.data;
    this.endpointStore.endpoints.subscribe(data => { this.endpoints = data });
    if (this.selectedEndpoint) {
      this.executeParams = this.selectedEndpoint.executeExample();
    }
    this.buildCodeMirrorOptions();
    this.createJobForm();
    this.jobForm.valueChanges
      .subscribe(form => {
        if (this.jobForm.invalid) {
          let executeParams = this.executeParams || '{}';
          const id = this.selectedEndpoint.name;
          executeParams = JSON.stringify(JSON.parse(executeParams));

          fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
          this.requestBody = `curl -X POST --header 'Content-Type: application/json' --header 'Accept: text/plain, application/json'
          -d '${executeParams}'
          '${this.apiUrl}/endpoints/${id}/jobs'`;
        }
      });
  }

  createJobForm() {
    this.jobForm = this.fb.group({
      executeParams: ['', [JSONValidator.validate]],
      selectedEndpoint: ['']
    })
  }

  onChangeEndpoint() {
    this.executeParams = this.selectedEndpoint.executeExample();
  }

  submit(form) {
    let fs = this.formsService;
    let endpointId = this.selectedEndpoint.name;
    let params = this.executeParams || '{}';

    if (form.valid) {
      this.jobStore.add(endpointId, params).subscribe((id) => {
        console.log(`init job ${id}`);
      });
      this.dialogRef.hide();
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


