import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobStore, FunctionStore } from '@stores/_index';
import { Job, FunctionInfo } from '@models/_index';



@Component({
    selector: 'mist-function-list',
    templateUrl: './function-list.component.html',
    styleUrls: ['./function-list.component.scss']
})
export class FunctionListComponent implements OnInit, OnDestroy {
    functions: FunctionInfo[];
    runningJobs: Job[];
    searchQ: string;
    private functionStoreSub;
    private jobStoreSub;
    public activeFunction: string;


    constructor(
        private functionStore: FunctionStore,
        private jobStore: JobStore,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.loadInitialData();
        this.router.events
            .subscribe((params) => {
                if (params && params['url']) {
                    this.activeFunction = params['url'].split(/\//);
                    this.activeFunction = this.activeFunction[this.activeFunction.length - 1];
                }
            });
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
        this.functionStore.getAll();
        this.functionStoreSub = this.functionStore.functions
            .subscribe(data => {
                this.functions = data;
            });
        this.jobStore.getAllRunning();
        this.jobStoreSub = this.jobStore.runningJobs
            .subscribe(jobs => {
                this.runningJobs = jobs;
            });
    }

    runningJobsCountBy(functionId: string): Number {
        let result = this.runningJobs.filter(job => job.functionId === functionId);
        return result.length;
    }

}
