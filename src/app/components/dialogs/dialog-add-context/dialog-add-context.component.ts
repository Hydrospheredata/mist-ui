import { Component, OnInit, OnDestroy } from '@angular/core';
import { Context } from '@models/context';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { FormsService } from '@services/forms.service';
import { ContextStore } from '@stores/context.store';
import { AlertService } from '@services/alert.service';

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
    streamingDuration: ''
  };
  private contextStoreSub;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdlDialogReference,
    private formsService: FormsService,
    private mdlSnackbarService: MdlSnackbarService,
    private contextStore: ContextStore,
    private alertService: AlertService
  ) {

  }

  ngOnInit() {
    const self = this;
    this.contextStoreSub = this.contextStore.get('default')
      .subscribe(context => {
        self.setDefaultContext(context);
    });

    this.createContextForm();
  }

  ngOnDestroy() {
    this.contextStoreSub.unsubscribe();
  }

  createContextForm(context?: Context) {
    const fs = this.formsService;
    this.contextForm = this.fb.group({
      name: ['', [Validators.required]],
      sparkConfs: this.fb.array([this.initSparkConf()]),
      downtime: ['', [Validators.required, Validators.pattern(fs.VALIDATION_PATTERNS.durationInSeconds)]],
      maxJobs: ['', [Validators.required, Validators.pattern(fs.VALIDATION_PATTERNS.number)]],
      precreated: [false],
      runOptions: [''],
      streamingDuration: ['', [Validators.pattern(fs.VALIDATION_PATTERNS.durationInSeconds)]]
    });

    this.contextForm.valueChanges
      .subscribe( () => {
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
    this.contextForm.patchValue( {sparkConfs: [{sparkConfKey: Object.keys(context.sparkConf)[0] }] } );
    this.contextForm.patchValue( {sparkConfs: [{sparkConfValue: context.sparkConf[Object.keys(context.sparkConf)[0]] }]} );
    this.contextForm.patchValue( {name: context.name} );
    this.contextForm.patchValue( {downtime: context.downtime} );
    this.contextForm.patchValue( {maxJobs: context.maxJobs} );
    this.contextForm.patchValue( {precreated: context.precreated} );
    this.contextForm.patchValue( {runOptions: context.runOptions} );
    this.contextForm.patchValue( {streamingDuration: context.streamingDuration} );
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
      streamingDuration: control.streamingDuration.value
    });

    this.contextStore.createContext(context)
      .subscribe( (response) => {
        this.dialogRef.hide();
        this.mdlSnackbarService.showSnackbar({
          message: `Context ${response.name} successfully added`,
          timeout: 5000
        });
        }, (error) => {
          this.alertService.error(error);
      });

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
