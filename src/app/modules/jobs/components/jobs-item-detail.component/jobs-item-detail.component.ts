import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { JobStore } from '@app/modules/core/stores/job.store';
import { MdlDialogService } from '@angular-mdl/core';
import {
    DialogFullScreenJsonComponent,
    injectableJsonString
} from '@app/components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';
import {
    DialogCloneJobFormComponent,
    // injectableJob
} from '@app/components/dialogs/dialog-clone-job-form/dialog-clone-job-form.component';
import { Job } from '@app/modules/shared/models';
import { Worker } from '@app/modules/shared/models';
import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
// import { WorkersStore } from '@app/modules/core/stores/_index';
import * as fromJobs from '@app/modules/jobs/reducers';
import * as fromWorkers from '@app/modules/workers/reducers';
import { Observable } from 'rxjs/Observable';
import { withLatestFrom } from 'rxjs/operators';
import { SetCurrent } from '@app/modules/core/actions';
import * as fromJobsActions from '@app/modules/jobs/actions';
import { JobStatusesService } from '@jobs/services/job-statuses.service'

@Component({
    selector: 'mist-jobs-item-detail',
    templateUrl: './jobs-item-detail.component.html',
    styleUrls: ['./jobs-item-detail.component.scss']
})
export class JobsItemDetailComponent implements OnInit, OnDestroy {
    @Input() jobDetails;

    job: Job;
    public job$: Observable<Job>;
    public jobParams$: Observable<string | object>;
    public jobArguments: string;
    public worker: Worker[];
    public worker$: Observable<Worker>;
    public workerId: string;
    public jobCreateTime: string;
    public jobStartTime: string;
    public jobEndTime: string;
    public jobCreateTimeDuration: string;
    public jobStartTimeDuration: string;

    constructor(
        private dialog: MdlDialogService,
        private store$: Store<MistState>,
        private activatedRoute: ActivatedRoute,
        public jobStatus: JobStatusesService
    ) {
        this.job$ = this.store$.select(fromJobs.getSelectedJob);
        this.worker$ = this.store$.select(fromJobs.getJobWorker);
        this.jobParams$ = this.store$.select(fromJobs.getParamsOfCurrentJob);
    }

    public get codeMirrorOptions() {
        return {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: true,
            scrollbarStyle: 'null',
            smartIndent: true
        }
    }

    ngOnInit() {
        this.activatedRoute.params
            .map(params => params['functionId'])
            .subscribe(id => this.getJobsByFunction(id));
    }

    ngOnDestroy() { }

    public getJobsByFunction(functionId) {
        this.store$.dispatch(new SetCurrent(0));
        this.store$.dispatch(new fromJobsActions.GetByFunction({ functionId: functionId, pagination: { offset: 0, current: 0 } }));
    }

    openDialogJobForm() {
        this.dialog.showCustomDialog({
            component: DialogCloneJobFormComponent,
            styles: { 'max-width': '900px', 'width': '850px' },
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
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

    private setDate(timestamp: number) {
        return moment(timestamp).format('MMM Do, kk:mm:ss.SSSS');
    }

    private setDuration(then: number, now: number) {
        return moment(moment.duration(moment(then).diff(moment(now))).asMilliseconds()).format('mm:ss.SSSS');
    }

}
