import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import {
    // DialogFunctionFormComponent,
    // injectableFunction,
    DialogJobFormComponent,
    // injectableSelectedFunction
} from '@app/components/dialogs/_index';
// import { ContextStore, JobStore, FunctionStore } from '@app/modules/core/stores/_index';
import { Context, Function, Job } from '@app/modules/shared/models';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@app/modules/jobs/reducers';
import * as fromJobsActions from '@app/modules/jobs/actions';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'mist-jobs-overview',
    templateUrl: './jobs-overview.component.html',
    styleUrls: ['./jobs-overview.component.scss'],
    providers: []
})
export class JobsOverviewComponent implements OnInit, OnDestroy {
    // functionInfo: Function;
    // jobs: Job[];
    public jobs$: Observable<Job[]>;
    // context: string;
    // statusFilter: { success: boolean, running: boolean, failed: boolean };
    // private activatedRouteSub: any;
    // private contextStoreSub;
    public contexts: Context[];
    // public currentContext: string;
    // public isOverview: boolean;
    public timeUpdaterLink: any;

    constructor(
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private store: Store<MistState>,
        // private functionStore: FunctionStore,
        // private jobStore: JobStore,
        // private contextStore: ContextStore,
    ) {
        this.jobs$ = this.store.select(fromJobs.getJobs);
        // this.store.select(fromJobs.getJobs).subscribe(x => console.log(x));
    }

    ngOnInit() {
        // this.setFilterOptions();
        // this.timeUpdaterLink = this.jobStore.updateTime();

        // this.activatedRouteSub = this.activatedRoute.params
        //     .map(params => {
        //         // this.currentContext = params['functionId'];
        //         // this.isOverview = this.currentContext === 'overview';
        //         return params['functionId'];
        //     })
        //     .subscribe(id => { this.loadInitialData(id) });

        // this.contextStore.getAll();
        // this.contextStoreSub = this.contextStore.contexts
        //     .subscribe(contexts => this.contexts = contexts)
    }

    ngOnDestroy() {
        // if (this.activatedRouteSub) {
        //     this.activatedRouteSub.unsubscribe();
        // }
        // if (this.contextStoreSub) {
        //     this.contextStoreSub.unsubscribe();
        // }
        if (this.timeUpdaterLink) {
            clearInterval(this.timeUpdaterLink)
        }
    }

    loadInitialData(id: string) {
        // if (id === 'overview') {
        //     this.jobStore.getAll();
        // } else {
        //     this.jobStore.getByFunctionId(id);
        // }

        // this.functionStore.functions
        //     .subscribe(data => {
        //         const foundFunction = data.find(item => item.name === id) || data[0];
        //         this.functionInfo = foundFunction;
        //     });
        // this.jobStore.jobs
        //     .subscribe((jobs: Job[]) => {
        //         this.jobs = jobs;
        //     });
    }

    public openDialogJobForm() {
        this.dialog.showCustomDialog({
            component: DialogJobFormComponent,
            styles: { 'max-width': '900px', 'width': '850px' },
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            // providers: [{ provide: injectableSelectedFunction, useValue: this.functionInfo }],
        });
    }

    public killJob(event, job: Job) {
        event.preventDefault();
        event.stopPropagation();
        this.store.dispatch(new fromJobsActions.Delete(job.jobId));
    }

    // toggleStatusFilter(option) {
    //     this.statusFilter[option] = !this.statusFilter[option];
    //     this.setFilterOptionsToLocalStorage();
    // }

    // selectContext(event, context) {
    //     event.preventDefault();
    //     this.context = context;
    // }

    // private setFilterOptions() {
    //     const options = JSON.parse(localStorage.getItem('jobsStatusFilter'));
    //     if (options) {
    //         this.statusFilter = options;
    //     } else {
    //         this.statusFilter = { success: true, running: true, failed: true };
    //         this.setFilterOptionsToLocalStorage()
    //     }
    // }

    // private setFilterOptionsToLocalStorage() {
    //     localStorage.setItem('jobsStatusFilter', JSON.stringify(this.statusFilter));
    // }

}
