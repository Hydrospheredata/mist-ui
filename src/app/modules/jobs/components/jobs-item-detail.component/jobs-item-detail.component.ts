import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { JobStore } from '@app/modules/core/stores/job.store';
import { MdlDialogService } from '@angular-mdl/core';
import {
    DialogFullScreenJsonComponent,
    injectableJsonString
} from '@components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';
import {
    DialogCloneJobFormComponent,
    // injectableJob
} from '@components/dialogs/dialog-clone-job-form/dialog-clone-job-form.component';
import { Job } from '@shared/models';
import { Worker } from '@shared/models';
import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
// import { WorkersStore } from '@app/modules/core/stores/_index';
import * as fromJobs from '@jobs/reducers';
import * as fromWorkers from '@workers/reducers';
import { Observable } from 'rxjs/Observable';
import { withLatestFrom } from '../../../../../../node_modules/rxjs/operators';


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
    // private activatedRouteSub: any;
    // private jobStoreSub: any;
    // private jobWorkerSub: any;
    public worker: Worker[];
    public worker$: Observable<Worker>;
    // private timeUpdaterLink;
    public workerId: string;
    public jobCreateTime: string;
    public jobStartTime: string;
    public jobEndTime: string;
    public jobCreateTimeDuration: string;
    public jobStartTimeDuration: string;

    constructor(
        private dialog: MdlDialogService,
        private store: Store<MistState>,
        // private activatedRoute: ActivatedRoute,
        // private jobStore: JobStore,
        // private workersStore: WorkersStore
    ) {
        this.job$ = this.store.select(fromJobs.getSelectedJob);
        this.worker$ = this.store.select(fromJobs.getJobWorker);
        this.jobParams$ = this.store.select(fromJobs.getParamsOfCurrentJob);
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
        // if (this.jobDetails) {
        //     this.job = this.jobDetails;
        // } else {
        //     this.activatedRouteSub = this.activatedRoute.params
        //         .subscribe((params) => {
        //             this.loadInitialData(params['jobId']);
        //         });
        // }
    }

    ngOnDestroy() {
        // if (this.activatedRouteSub) {
        //     this.activatedRouteSub.unsubscribe();
        // }
        // if (this.jobStoreSub) {
        //     this.jobStoreSub.unsubscribe();
        // }
        // if (this.timeUpdaterLink) {
        //     clearInterval(this.timeUpdaterLink);
        // }
        // if (this.jobWorkerSub) {
        //     this.jobWorkerSub.unsubscribe();
        // }
    }

    loadInitialData(jobId) {
        // this.jobStore.get(jobId);
        // this.jobStoreSub = this.jobStore.jobs
        //     .subscribe((jobs: Job[]) => {
        //         this.job = jobs.find(job => job.jobId === jobId);

        //         if (this.job) {

        //             if (this.job.createTime) {
        //                 this.jobCreateTime = this.setDate(this.job.createTime);
        //                 this.jobCreateTimeDuration = this.setDuration(this.job.endTime, this.job.createTime);
        //             }
        //             if (this.job.startTime) {
        //                 this.jobStartTime = this.setDate(this.job.startTime);
        //                 this.jobCreateTimeDuration = this.setDuration(this.job.startTime, this.job.createTime);
        //                 this.jobStartTimeDuration = this.setDuration(this.job.endTime, this.job.startTime);
        //             }
        //             if (this.job.endTime) {
        //                 this.jobEndTime = this.setDate(this.job.endTime);
        //             }
        //             this.timeUpdaterLink = this.jobStore.updateTime();
        //             this.jobArguments = JSON.stringify(JSON.parse(this.job.params).arguments, null, 2);
        //         }
        //     });
    }

    openDialogJobForm() {
        this.dialog.showCustomDialog({
            component: DialogCloneJobFormComponent,
            styles: { 'max-width': '900px', 'width': '850px' },
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            // providers: [{ provide: injectableJob, useValue: this.job }],
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
