import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdlDialogReference } from '@angular-mdl/core';
import { Router } from '@angular/router';
import { JSONValidator } from '@app/validators/json.validator';
// import { JobStore } from '@app/modules/core/stores/job.store';
import { FormsService } from '@app/modules/core/services/forms.service';
import { Job } from '@app/modules/shared/models';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';

import * as fromJobs from '@app/modules/jobs/reducers';
import { Observable } from 'rxjs/Observable';

import * as jobsActions from '@app/modules/jobs/actions';

// export let injectableJob = new InjectionToken<Job>('job');

@Component({
    selector: 'mist-dialog-clone-job-form',
    templateUrl: './dialog-clone-job-form.component.html',
    styleUrls: ['./dialog-clone-job-form.component.scss'],
    providers: [FormsService]
})

export class DialogCloneJobFormComponent implements OnInit {
    public jobForm: FormGroup;
    data: Job;
    job: Job;
    public job$: Observable<Job>;
    executeParams: string;
    public formErrors: object = {
        executeParams: ''
    };
    private jobFormSub;

    constructor(
        private fb: FormBuilder,
        private formsService: FormsService,
        private router: Router,
        public dialogRef: MdlDialogReference,
        private store: Store<MistState>,
    ) {
        this.store.select(fromJobs.getSelectedJob).subscribe(job => this.job = job);
    }

    @HostListener('document:keydown.escape')
    public onEsc(): void {
        this.dialogRef.hide();
    }

    public get codeMirrorOptions() {
        return {
            placeholder: 'Parameters...',
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true
        }
    }

    ngOnInit() {
        this.createForm();
        this.updateForm();
        this.formListener();
    }


    private createForm() {
        this.jobForm = this.fb.group({
            executeParams: ['', [JSONValidator.validate]]
        })
    }

    private updateForm() {
        // const fn = this.function ? this.function : this.functions[0];
        // const jobId = fn.name;
        // this.context = fn.defaultContext;
        // this.requestBody = `curl -X POST -d '${fn.executeExample() || '{}'}' '${this.apiUrl}/functions/${jobId}/jobs'`;
        this.jobForm.patchValue({
            executeParams: this.preBuildParams() || '{}'
        });
    }

    private formListener() {
        const fs = this.formsService;
        this.jobForm.valueChanges
            .subscribe(form => {
                if (this.jobForm.invalid) {
                    fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
                }
                // if (!this.jobForm.invalid) {
                //     console.log(form);
                //     let executeParams = form.executeParams || '{}';
                //     const jobId = form.function.name;

                //     try {
                //         executeParams = JSON.stringify(JSON.parse(executeParams));
                //     } catch (error) {
                //         this.formsService.setErrors(this.jobForm, this.formErrors, this.formsService.MESSAGES.ERRORS.forms.runJob);
                //         return;
                //     }

                //     this.formsService.setErrors(this.jobForm, this.formErrors, this.formsService.MESSAGES.ERRORS.forms.runJob);
                //     this.requestBody = `curl -X POST -d '${executeParams}' '${this.apiUrl}/functions/${jobId}/jobs'`;
            })
    }

    submit() {
        const form = this.jobForm;
        const fs = this.formsService;
        const params = form.value.executeParams || '{}';

        if (form.invalid) {
            fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
            return false
        }

        this.store.dispatch(new jobsActions.Add(this.job.functionId, params));
        this.dialogRef.hide();

        // const fs = this.formsService;
        // let params = this.executeParams || '{}';
        // if (form.valid) {
        //     this.jobStoreSub = this.jobStore.add(this.job.functionId, params).subscribe((id) => {
        //         console.log(`init job ${id}`);
        //         this.dialogRef.hide();
        //         this.router.navigate(['/jobs', this.job.functionId, id])
        //     });
        // } else {
        //     fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
        //     return false
        // }
    }

    private preBuildParams() {
        let args = JSON.stringify(this.job.params.arguments, null, '\t');
        return args;
    }

}


