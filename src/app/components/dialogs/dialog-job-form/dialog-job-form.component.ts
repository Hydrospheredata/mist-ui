import { Component, OnInit, Inject, HostListener, InjectionToken } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { Function } from '@app/modules/shared/models';
import { JobStore } from '@app/modules/core/stores/job.store';
import { JSONValidator } from '@app/validators/json.validator';
import { FormsService } from '@app/modules/core/services/forms.service';
import { MdlSnackbarService } from '@angular-mdl/core';
import { environment } from '@environments/environment';
import { Location } from '@angular/common';
import { AlertService } from '@app/modules/core/services/alert.service';

import {
    DialogFullScreenJsonComponent,
    injectableJsonString
} from '@app/components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromFunctions from '@app/modules/functions/reducers';
import * as jobsActions from '@app/modules/jobs/actions';

// export let injectableSelectedFunction = new InjectionToken<Function>('selectedFunction');

@Component({
    selector: 'mist-dialog-job-form',
    templateUrl: './dialog-job-form.component.html',
    styleUrls: ['./dialog-job-form.component.scss'],
    providers: [FormsService, MdlSnackbarService, AlertService]
})

export class DialogJobFormComponent implements OnInit {
    public jobForm: FormGroup;
    public function$: Observable<Function>;
    public functions$: Observable<Function[]>;
    data: Function;
    functions: Function[];
    public function: Function;
    selectedFunction: Function;
    executeParams: string;
    public formErrors: object = {
        executeParams: ''
    };
    public requestBody: string;
    private port: string;
    private apiUrl: string;

    public context: string;

    constructor(
        // @Inject(injectableSelectedFunction) data: Function,
        // private jobStore: JobStore,
        private fb: FormBuilder,
        private formsService: FormsService,
        private mdlSnackbarService: MdlSnackbarService,
        private location: Location,
        public dialogRef: MdlDialogReference,
        // private alertService: AlertService,
        private dialog: MdlDialogService,
        private store: Store<MistState>
    ) {
        this.store.select(fromFunctions.getSelectedFunction)
            .subscribe(fn => {
                this.function = fn;
            })
        this.store.select(fromFunctions.getAllFunctions)
            .subscribe(fns => {
                this.functions = fns;
            });

        this.port = environment.production ? window.location.port : environment.port;
        const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
        this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}${path}`;
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

    public onChangeFunction(event) {
        const jobId = event.name;
        this.jobForm.patchValue({ executeParams: event.executeExample() || '{}' });
        this.requestBody = `curl -X POST -d '${event.executeExample() || '{}'}' '${this.apiUrl}/functions/${jobId}/jobs'`;
    }

    public openFullScreenJson() {
        let jsonString = this.jobForm.value.executeParams
        if (typeof jsonString === 'object') {
            jsonString = JSON.stringify(jsonString);
        }
        this.dialog.showCustomDialog({
            component: DialogFullScreenJsonComponent,
            styles: { 'width': '100%', 'height': '100%' },
            providers: [{ provide: injectableJsonString, useValue: jsonString }],
        });
    }

    public submit() {
        const form = this.jobForm;
        const fs = this.formsService;
        const functionId = form.value.function.name;
        const params = form.value.executeParams || '{}';

        if (form.invalid) {
            fs.setErrors(this.jobForm, this.formErrors, fs.MESSAGES.ERRORS.forms.runJob);
            return false
        }

        this.store.dispatch(new jobsActions.Add(functionId, params));
        this.dialogRef.hide();

        // this.jobStore.add(functionId, params)
        //     .subscribe((id) => {
        //         this.dialogRef.hide();
        //         this.mdlSnackbarService.showSnackbar({
        //             message: `Job ${id} initialisation was successful`,
        //             timeout: 5000
        //         });
        //         console.log(`init job ${id}`);
        //     }, (error) => {
        //         this.alertService.error(error);
        //     });
    }

    public copiedToClipBoardSuccessfully() {
        this.mdlSnackbarService.showSnackbar({
            message: `CURL params were copied out to clipboard successfully`,
            timeout: 5000
        });
    }

    private createForm() {
        this.jobForm = this.fb.group({
            executeParams: ['', [JSONValidator.validate]],
            function: [''],
        });
    }

    private updateForm() {
        const fn = this.function ? this.function : this.functions[0];
        const jobId = fn.name;
        this.context = fn.defaultContext;
        this.requestBody = `curl -X POST -d '${JSON.stringify(JSON.parse(fn.executeExample())) || '{}'}' '${this.apiUrl}/functions/${jobId}/jobs'`;
        this.jobForm.patchValue({
            function: fn,
            executeParams: fn.executeExample()
        });
    }

    private formListener() {
        this.jobForm.valueChanges
            .subscribe(form => {
                if (!this.jobForm.invalid) {
                    console.log(form);
                    let executeParams = form.executeParams || '{}';
                    const jobId = form.function.name;

                    try {
                        executeParams = JSON.stringify(JSON.parse(executeParams));
                    } catch (error) {
                        this.formsService.setErrors(this.jobForm, this.formErrors, this.formsService.MESSAGES.ERRORS.forms.runJob);
                        return;
                    }

                    this.formsService.setErrors(this.jobForm, this.formErrors, this.formsService.MESSAGES.ERRORS.forms.runJob);
                    this.requestBody = `curl -X POST -d '${executeParams}' '${this.apiUrl}/functions/${jobId}/jobs'`;
                }
            });
    }

}


