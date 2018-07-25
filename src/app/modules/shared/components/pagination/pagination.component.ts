import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@jobs/reducers';
import { withLatestFrom } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Forward, Backward, GoTo } from '@core/actions';

@Component({
    selector: 'mist-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    public total: number;
    public pages: number[];
    public current: number = 0;
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
            if (jobs.length >= 25 && total > 25) {
                const pagesNumber = Math.ceil(total / jobs.length);
                this.pages = Array(pagesNumber).map((x, i) => i);
            }
        });
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public onPrev() {
        this.store.dispatch(new Backward({ offset: -25 }));
    }

    public onNext() {
        this.store.dispatch(new Forward({ offset: 25 }));
    }

    public goTo(pageNumber: number) {
        this.current = pageNumber;
        this.store.dispatch(new GoTo({ offset: pageNumber * 25 }));
    }
}
