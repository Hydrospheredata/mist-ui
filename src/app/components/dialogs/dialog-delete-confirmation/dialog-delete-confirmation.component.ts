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
import * as fromWorkersActions from '@app/modules/workers/actions';
import { Worker } from '@shared/models';

export let injectableWorker = new InjectionToken<Worker>('injectableWorker');

@Component({
    selector: 'mist-dialog-delete-confirmation',
    templateUrl: './dialog-delete-confirmation.component.html',
    styleUrls: ['./dialog-delete-confirmation.component.scss'],
    providers: [FormsService, MdlSnackbarService, AlertService]
})

export class DialogDeleteConfirmationComponent implements OnInit {
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
    public worker: Worker;

    public context: string;

    constructor(
        @Inject(injectableWorker) worker: Worker,
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
        this.worker = worker;
    }

    ngOnInit() { }

    public submit() {
        this.store.dispatch(new fromWorkersActions.Delete(this.worker.name));
        this.dialogRef.hide();
    }
}


