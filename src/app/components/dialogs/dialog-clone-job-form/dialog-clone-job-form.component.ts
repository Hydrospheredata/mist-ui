import { Component, OnInit, Inject, HostListener, InjectionToken, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdlDialogReference } from '@angular-mdl/core';
import { Router } from '@angular/router';
import { JSONValidator } from '@app/validators/json.validator';
import { JobStore } from '@stores/job.store';
import { FormsService } from '@services/forms.service';
import { Job } from '@models/job';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

export let injectableJob = new InjectionToken<Job>('job');

@Component({
  selector: 'mist-dialog-clone-job-form',
  templateUrl: './dialog-clone-job-form.component.html',
  styleUrls: ['./dialog-clone-job-form.component.scss'],
  providers: [FormsService]
})

export class DialogCloneJobFormComponent implements OnInit, OnDestroy {
  public jobForm: FormGroup;
  data: Job;
  job: Job;
  codeMirrorOptions: {};
  executeParams: string;
  public formErrors: object = {
    executeParams: ''
  };
  private jobFormSub;
  private jobStoreSub;

  constructor(
    @Inject(injectableJob) data: Job,
    private jobStore: JobStore,
    private fb: FormBuilder,
    private formsService: FormsService,
    private router: Router,
    public dialogRef: MdlDialogReference) {

    this.data = data;
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  ngOnInit() {
    const fs = this.formsService;
    this.job = this.data;
    this.executeParams = this.preBuildParams() || '{}';
    this.buildCodeMirrorOptions();
    this.createJobForm();
    this.jobFormSub = this.jobForm.valueChanges
      .subscribe(form => {
        if (this.jobForm.invalid) {
          fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
        }
      });
  }

  ngOnDestroy() {
    if (this.jobFormSub) {
      this.jobFormSub.unsubscribe();
    }
    if (this.jobStoreSub) {
      this.jobStoreSub.unsubscribe();
    }
  }

  createJobForm() {
    this.jobForm = this.fb.group({
      executeParams: ['', [JSONValidator.validate]]
    })
  }

  submit(form) {
    const fs = this.formsService;
    let params = this.executeParams || '{}';
    if (form.valid) {
      this.jobStoreSub = this.jobStore.add(this.job.functionId, params).subscribe((id) => {
        console.log(`init job ${id}`);
        this.dialogRef.hide();
        this.router.navigate(['/jobs', this.job.functionId, id])
      });
    } else {
      fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
      return false
    }
  }

  private preBuildParams() {
    let params = JSON.parse(this.job.params);
    let args = JSON.stringify(params.arguments, null, "\t");
    return args;
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


