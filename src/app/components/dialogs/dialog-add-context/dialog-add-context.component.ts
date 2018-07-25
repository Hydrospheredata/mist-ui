import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Context } from '@app/modules/shared/models';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { FormsService } from '@app/modules/core/services/forms.service';
import { ContextStore } from '@app/modules/core/stores/context.store';
import { AlertService } from '@app/modules/core/services/alert.service';
import { HttpContextsService } from '@app/modules/core/services/_index';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import { AddContext } from '@app/modules/core/actions';

@Component({
    selector: 'mist-dialog-add-context',
    templateUrl: './dialog-add-context.component.html',
    styleUrls: ['./dialog-add-context.component.scss'],
    providers: [FormsService, AlertService]
})
export class DialogAddContextComponent implements OnInit, OnDestroy {
    public contextForm: FormGroup;
    public formErrors = {
        name: '',
        sparkConfValue: '',
        sparkConfKey: '',
        sparkConfs: {},
        downtime: '',
        maxJobs: '',
        precreated: '',
        runOptions: '',
        workerMode: '',
        streamingDuration: ''
    };
    private contextStoreSub;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        private formsService: FormsService,
        private mdlSnackbarService: MdlSnackbarService,
        // private contextStore: ContextStore,
        private alertService: AlertService,
        private contextService: HttpContextsService,
        private store$: Store<MistState>,
    ) {

    }

    ngOnInit() {
        const self = this;
        // this.contextStoreSub = this.contextStore.get('default')
        //     .subscribe(context => {
        //         self.setDefaultContext(context);
        //     });

        this.contextService.get('default')
            .subscribe(context => this.setDefaultContext(context));

        this.createContextForm();
    }

    @HostListener('document:keydown.escape')
    public onEsc(): void {
        this.dialogRef.hide();
    }

    ngOnDestroy() {
        if (this.contextStoreSub) {
            this.contextStoreSub.unsubscribe();
        }
    }

    createContextForm(context?: Context) {
        const fs = this.formsService;
        let sparkConfs = [];
        for (let i = 0; i < 4; i++) {
            sparkConfs.push(this.initSparkConf());
        }
        this.contextForm = this.fb.group({
            name: ['', [Validators.required]],
            sparkConfs: this.fb.array(sparkConfs),
            downtime: ['', [Validators.pattern(fs.VALIDATION_PATTERNS.durationInSeconds)]],
            maxJobs: ['', [Validators.pattern(fs.VALIDATION_PATTERNS.number)]],
            precreated: [false],
            runOptions: [''],
            workerMode: [''],
            streamingDuration: ['', [Validators.pattern(fs.VALIDATION_PATTERNS.durationInSeconds)]]
        });

        this.contextForm.valueChanges
            .subscribe((data) => {
                fs.setErrors(this.contextForm, this.formErrors, fs.MESSAGES.ERRORS.forms.addContext);
            });

        fs.setErrors(this.contextForm, this.formErrors, fs.MESSAGES.ERRORS.forms.addContext);
    }

    initSparkConf(key?, value?) {
        return this.fb.group({
            sparkConfKey: [key, [Validators.required]],
            sparkConfValue: [value, [Validators.required]]
        });
    }

    sparkConfsToMap(sparkConfs: Array<object>): Object {
        const obj: object = {};

        if (!sparkConfs.length) {
            return obj;
        }

        for (let i = 0; i < sparkConfs.length; i++) {
            obj[sparkConfs[i]['sparkConfKey']] = sparkConfs[i]['sparkConfValue'];
        }

        return obj;
    }

    setDefaultContext(context) {
        this.contextForm.patchValue({
            sparkConfs: [{
                sparkConfKey: Object.keys(context.sparkConf)[0]
            }, {
                sparkConfKey: 'spark.default.parallelism'
            }, {
                sparkConfKey: 'spark.driver.memory'
            }, {
                sparkConfKey: 'spark.scheduler.mode'
            }, {
                sparkConfKey: 'spark.driver.allowmultiplecontexts'
            },
            ]
        });
        this.contextForm.patchValue({
            sparkConfs: [{
                sparkConfValue: context.sparkConf[Object.keys(context.sparkConf)[0]],
            }, {
                sparkConfValue: '2',
            }, {
                sparkConfValue: '2g',
            }, {
                sparkConfValue: 'FAIR',
            }, {
                sparkConfValue: 'true',
            }
            ]
        });
        this.contextForm.patchValue({ name: context.name });
        this.contextForm.patchValue({ downtime: context.downtime });
        this.contextForm.patchValue({ maxJobs: context.maxJobs });
        this.contextForm.patchValue({ workerMode: context.workerMode });
        this.contextForm.patchValue({ precreated: context.precreated });
        this.contextForm.patchValue({ runOptions: context.runOptions });
        this.contextForm.patchValue({ streamingDuration: context.streamingDuration });
    }

    submitContextForm(form) {
        const control = form.controls;

        const context = new Context({
            name: control.name.value,
            sparkConf: this.sparkConfsToMap(control.sparkConfs.value),
            downtime: control.downtime.value,
            maxJobs: Number(control.maxJobs.value),
            precreated: control.precreated.value,
            runOptions: control.runOptions.value,
            workerMode: control.workerMode.value,
            streamingDuration: control.streamingDuration.value
        });

        if (context.workerMode === 'exclusive') {
            delete context.precreated;
            delete context.downtime
        }

        this.store$.dispatch(new AddContext(context));
        this.dialogRef.hide();

        // this.contextStore.createContext(context)
        //     .subscribe((response) => {
        //         this.dialogRef.hide();
        //         this.mdlSnackbarService.showSnackbar({
        //             message: `Context ${response.name} successfully added`,
        //             timeout: 5000
        //         });
        //     }, (error) => {
        //         this.alertService.error(error);
        //     });
    }

    addSparkConf() {
        const control = <FormArray>this.contextForm.controls['sparkConfs'];
        control.push((this.initSparkConf()));
    }

    removeSparkConf(i: number) {
        const control = <FormArray>this.contextForm.controls['sparkConfs'];
        control.removeAt(i);
    }

}
