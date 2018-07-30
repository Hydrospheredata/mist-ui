import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@jobs/reducers';
import { withLatestFrom } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Forward, Backward, GoTo } from '@core/actions';
import * as fromRoot from '@core/reducers';

@Component({
    selector: 'mist-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    public total: number;
    public pages: number[];
    public current: number = 0;
    public current$: Observable<number>;
    private subscription: Subscription;
    private base: number = 5;

    constructor(
        private store$: Store<MistState>
    ) {
        this.subscription = this.store$.select(fromJobs.getJobs).pipe(
            withLatestFrom(
                this.store$.select(fromJobs.getJobsTotal)
            )
        ).subscribe(([jobs, total]) => {
            if (jobs.length >= this.base && total > this.base) {
                const pagesNumber = Math.ceil(total / jobs.length);
                this.pages = Array(pagesNumber).map((x, i) => i);
            }
        });

        this.current$ = this.store$.select(fromRoot.getPaginationCurrent)
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public onPrev() {
        this.current--;
        this.store$.dispatch(new Backward({ offset: -this.base, current: this.current }));
    }

    public onNext() {
        this.current++;
        this.store$.dispatch(new Forward({ offset: this.base, current: this.current }));
    }

    public goTo(pageNumber: number) {
        this.current = pageNumber;
        this.store$.dispatch(new GoTo({ offset: pageNumber * this.base, current: this.current }));
    }
}
