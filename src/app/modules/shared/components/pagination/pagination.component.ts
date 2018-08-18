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
    public current: number;
    private base: number = 5;

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
        this.store$.select(fromRoot.getPaginationCurrent).subscribe(current => this.current = current);
    }

    ngOnInit() { }

    ngOnDestroy() { }

    public onPrev() {
        this.store$.dispatch(new Backward({ offset: -this.base, current: this.current-- }));
    }

    public onNext() {
        this.store$.dispatch(new Forward({ offset: this.base, current: this.current++ }));
    }

    public goTo(pageNumber: number) {
        this.store$.dispatch(new GoTo({ offset: pageNumber * this.base, current: pageNumber }));
    }
}
