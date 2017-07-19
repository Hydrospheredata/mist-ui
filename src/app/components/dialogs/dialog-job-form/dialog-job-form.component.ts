import { Component, OnInit, Inject, HostListener, InjectionToken } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdlDialogReference } from '@angular-mdl/core';
import { Endpoint } from '@models/endpoint';
import { EndpointStore } from '@stores/endpoint.store';
import { JobStore } from '@stores/job.store';
import { JSONValidator } from '@app/validators/json.validator';
import { FormsService } from '@services/forms.service';
import { Messages } from '@app/constants/messages';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

export let injectableSelectedEndpoint = new InjectionToken<Endpoint>('selectedEndpoint');

@Component({
  selector: 'mist-dialog-job-form',
  templateUrl: './dialog-job-form.component.html',
  styleUrls: ['./dialog-job-form.component.scss'],
  providers: [FormsService]
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

  constructor(
    @Inject(injectableSelectedEndpoint) data: Endpoint,
    private endpointStore: EndpointStore,
    private jobStore: JobStore,
    private fb: FormBuilder,
    private FormsService: FormsService,
    public dialogRef: MdlDialogReference) {

    this.data = data;
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  ngOnInit() {
    this.selectedEndpoint = this.data;
    this.endpointStore.endpoints.subscribe(data => { this.endpoints = data });
    this.executeParams = this.selectedEndpoint.executeExample();
    this.buildCodeMirrorOptions();
    this.createJobForm();
    this.jobForm.valueChanges
      .subscribe(form => {
        if (this.jobForm.invalid) {
          this.FormsService.setErrors(this.jobForm, this.formErrors, Messages.ERRORS.forms.runJob);
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
    let endpointId = this.selectedEndpoint.name;
    let params = this.executeParams || '{}';
    if (form.valid) {
      this.jobStore.add(endpointId, params).subscribe((id) => {
        console.log(`init job ${id}`);
      });
      this.dialogRef.hide();
    } else {
      this.FormsService.setErrors(this.jobForm, this.formErrors, Messages.ERRORS.forms.runJob);
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
}


