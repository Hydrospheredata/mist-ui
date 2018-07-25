import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@jobs/reducers';
import { withLatestFrom } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Forward, Backward } from '@core/actions';

@Component({
    selector: 'mist-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    public total: number;
    public pages: number;
    private subscription: Subscription;

    constructor(
        private store: Store<MistState>
    ) {
        this.subscription = this.store.select(fromJobs.getJobs).pipe(
            withLatestFrom(
                this.store.select(fromJobs.getJobsTotal)
            )
        ).subscribe(([jobs, total]) => {
            console.log(jobs, total);
            if (total > 25) {
                this.pages = Math.ceil(total / jobs.length)
            }
        });
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public onPrev() {
        // this.store.dispatch(new Backward())
    }

    public onNext() {
        // this.store.dispatch(new Forward())
    }
}
