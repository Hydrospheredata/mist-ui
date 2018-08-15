import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@jobs/reducers';
import { withLatestFrom, map } from 'rxjs/operators';
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
    public pages$: Observable<number[]>;
    public current: number = 0;
    private base: number = 25;

    constructor(
        private store$: Store<MistState>
    ) {
        this.pages$ = this.store$.select(fromJobs.getJobsTotal).pipe(
            withLatestFrom(
                this.store$.select(fromJobs.getJobs)
            ),
            map(([total, jobs]) => {
                if (total > this.base) {
                    const pagesNumber = Math.ceil(total / this.base);
                    return Array(pagesNumber).map((x, i) => i);
                }
            })
        )
    }

    ngOnInit() { }

    ngOnDestroy() { }

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
