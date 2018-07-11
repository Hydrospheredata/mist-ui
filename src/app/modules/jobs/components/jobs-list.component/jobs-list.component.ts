import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { JobStore } from '@app/modules/core/stores/_index';
import { Job, Function } from '@shared/models';
import { MistState } from '@core/reducers';
import { Store } from '@ngrx/store';
import * as fromFunctions from '@functions/reducers';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'mist-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit, OnDestroy {
    functions: Function[];
    runningJobs: Job[];
    searchQ: string;
    private functionStoreSub;
    private jobStoreSub;
    public activeFunction: string;
    public functions$: Observable<Function[]>;


    constructor(
        // private jobStore: JobStore,
        // private router: Router,
        private store: Store<MistState>
    ) {
        this.functions$ = this.store.select(fromFunctions.getAllFunctions);
    }

    ngOnInit() {
        // this.jobStore.getAllRunning();
        // this.jobStoreSub = this.jobStore.runningJobs
        //     .subscribe(jobs => {
        //         this.runningJobs = jobs;
        //     });
        // this.loadInitialData();
        // this.router.events
        //     .subscribe((params) => {
        //         if (params && params['url']) {
        //             this.activeFunction = params['url'].split(/\//);
        //             this.activeFunction = this.activeFunction[this.activeFunction.length - 1];
        //         }
        //     });
    }

    ngOnDestroy() {
        if (this.functionStoreSub) {
            this.functionStoreSub.unsubscribe();
        }
        if (this.jobStoreSub) {
            this.jobStoreSub.unsubscribe();
        }
    }

    loadInitialData() {
        // this.functionStore.getAll();
        // this.functionStoreSub = this.functionStore.functions
        //     .subscribe(data => {
        //         this.functions = data;
        //     });
        // this.jobStore.getAllRunning();
        // this.jobStoreSub = this.jobStore.runningJobs
        //     .subscribe(jobs => {
        //         this.runningJobs = jobs;
        //     });
    }

    runningJobsCountBy(functionId: string): Number {
        let result = this.runningJobs.filter(job => job.functionId === functionId);
        return result.length;
    }

}
