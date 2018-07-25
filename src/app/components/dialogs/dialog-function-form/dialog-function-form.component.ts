import { Component, OnInit, HostListener, Inject, InjectionToken, OnDestroy } from '@angular/core';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Context } from '@app/modules/shared/models';
import { FormsService } from '@app/modules/core/services/forms.service';
// import { FunctionStore } from '@app/modules/core/stores/function.store';
// import { ContextStore } from '@app/modules/core/stores/context.store';
// import { JobStore } from '@app/modules/core/stores/job.store'
import { Function } from '@app/modules/shared/models';
import { MdlSnackbarService } from '@angular-mdl/core';
import { DialogAddContextComponent } from '@app/components/dialogs/dialog-add-context/dialog-add-context.component';
import { environment } from '@environments/environment';
import { Location } from '@angular/common';
import { AlertService } from '@app/modules/core/services/alert.service';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { MistState } from '@app/modules/core/reducers';

export let injectableFunction = new InjectionToken<Observable<Function>>('selectedFunction');

import * as fromContext from '@core/reducers';
import { Observable } from '../../../../../node_modules/rxjs';
import { Add, Update } from '@app/modules/functions/actions';



@Component({
    selector: 'mist-dialog-add-function',
    templateUrl: './dialog-function-form.component.html',
    styleUrls: ['./dialog-function-form.component.scss'],
    providers: [FormsService, MdlSnackbarService, AlertService]
})
export class DialogFunctionFormComponent implements OnInit, OnDestroy {
    public formTitle: string;
    public functionNameReadOnly: boolean;
    public functionForm: FormGroup;
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
    public defaultContext: string;
    public functionInfo: Function;
    private data: Function;
    private requestBody: string;
    private requestMethod: string;
    private port: string;
    private apiUrl: string;
    private functionFormSub;
    private contextStoreSub;
    private functionStoreSub;

    public contexts$: Observable<Context[]>;

    @HostListener('document:keydown.escape')
    public onEsc() {
        this.dialogRef.hide();
    }

    constructor(
        private fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        private formsService: FormsService,
        // private functionStore: FunctionStore,
        // private jobStore: JobStore,
        private mdlSnackbarService: MdlSnackbarService,
        private dialog: MdlDialogService,
        // private contextStore: ContextStore,
        @Inject(injectableFunction) data: Observable<Function>,
        private location: Location,
        private alertService: AlertService,
        private store: Store<MistState>,
    ) {
        this.port = environment.production ? window.location.port : environment.port;
        const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
        this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}${path}`;

        // this.functionInfo = data;

        if (data) {
            data
                .subscribe(data => {
                    console.log(data);
                    this.functionInfo = data;
                    this.formTitle = 'Update Function';
                    this.functionNameReadOnly = true;
                    this.requestMethod = 'PUT';
                });
        } else {
            this.formTitle = 'Add Function';
            this.requestMethod = 'POST';
        }

        // if (!this.functionInfo) {
        //     this.formTitle = 'Add Function';
        //     this.requestMethod = 'POST';
        // } else {
        //     this.formTitle = 'Update Function';
        //     this.functionNameReadOnly = true;
        //     this.requestMethod = 'PUT';
        // }

        this.contexts$ = this.store.select(fromContext.getAllContexts);
    }

    ngOnInit() {
        this.createFunctionForm();
        // console.log(this.functionInfo);
        // this.contextStore.getAll();
        // this.contextStoreSub = this.contextStore.contexts.subscribe(data => { this.contexts = data });
        if (this.functionInfo) {
            this.updateFunctionFormValues(this.functionInfo);
        };
    }

    ngOnDestroy() {
        if (this.contextStoreSub) {
            this.contextStoreSub.unsubscribe();
        }
        if (this.functionFormSub) {
            this.functionFormSub.unsubscribe();
        }
        if (this.functionFormSub) {
            this.functionFormSub.unsubscribe();
        }
    }

    private createFunctionForm() {
        const fs = this.formsService;
        this.functionForm = this.fb.group({
            name: ['', [Validators.required]],
            path: ['', [Validators.required]],
            defaultContext: ['', [Validators.required]],
            className: ['', [Validators.required]],
        });

        this.functionForm.valueChanges
            .subscribe(() => {
                fs.setErrors(this.functionForm, this.formErrors, fs.MESSAGES.ERRORS.forms.addFunction);
            });

        fs.setErrors(this.functionForm, this.formErrors, fs.MESSAGES.ERRORS.forms.addFunction);
    }

    private updateFunctionFormValues(functionInfo: Function) {
        this.defaultContext = functionInfo.defaultContext;
        this.functionForm.setValue({
            name: functionInfo.name,
            path: functionInfo.path,
            defaultContext: functionInfo.defaultContext,
            className: functionInfo.className || '',
        });
    }

    public submitFunctionForm(form) {
        let functionRequestMethod;
        const self = this;
        const fs = this.formsService;
        let functionMessage = 'has been successfully ';
        const _function = new Function({
            name: form.controls.name.value,
            path: form.controls.path.value,
            className: form.controls.className.value,
            defaultContext: form.controls.defaultContext.value,
            file: this.file
        });

        if (form.valid) {
            // this.loading = true;
            if (!this.functionInfo) {
                // functionRequestMethod = this.functionStore.createFunction(_function);
                this.store.dispatch(new Add(_function));
                functionMessage += 'added';
            } else {
                // functionRequestMethod = this.functionStore.updateFunction(_function);
                this.store.dispatch(new Update(_function));
                functionMessage += 'updated';
            }

            // functionRequestMethod
            //     .subscribe(
            //         (functionInfo) => {
            //             // self.loading = false;
            //             this.dialogRef.hide();
            //             this.mdlSnackbarService.showSnackbar({
            //                 message: `${functionInfo.name} ${functionMessage}`,
            //                 timeout: 5000
            //             });
            //         },
            //         (error) => {
            //             // self.loading = false;
            //             this.alertService.error(error);
            //         }
            //     );

        } else {
            fs.setErrors(this.functionForm, this.formErrors, fs.MESSAGES.ERRORS.forms.addFunction);
            return false;
        }
    }

    public showDialogContext() {
        this.dialog.showCustomDialog({
            component: DialogAddContextComponent,
            styles: { 'width': '850px' },
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
    }

    onFileChange($event) {
        this.file = $event.target.files[0];
    }

    copiedToClipBoardSuccessfully(inputTarget) {
        this.mdlSnackbarService.showSnackbar({
            message: `CURL params were copied out to clipboard successfully`,
            timeout: 5000
        });
    }

}
