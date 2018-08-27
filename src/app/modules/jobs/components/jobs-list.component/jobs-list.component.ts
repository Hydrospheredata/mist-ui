import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job, Function } from '@app/modules/shared/models';
import { MistState } from '@app/modules/core/reducers';
import { Store } from '@ngrx/store';
import * as fromFunctions from '@app/modules/functions/reducers';
import * as fromJobs from '@app/modules/jobs/reducers';
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
    public activeFunction: string;
    public functions$: Observable<Function[]>;
    public runningJobs$: Observable<number>;


    constructor(
        private store$: Store<MistState>,
    ) {
        this.functions$ = this.store$.select(fromFunctions.getAllFunctions);
        this.runningJobs$ = this.store$.select(fromJobs.getJobsRunning);
    }

    ngOnInit() { }

    ngOnDestroy() { }

    runningJobsCountBy(functionId: string): Number {
        let result = this.runningJobs.filter(job => job.functionId === functionId);
        return result.length;
    }

}
