import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@jobs/reducers';
import { withLatestFrom, map, tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Forward, Backward, GoTo, SetCurrent } from '@core/actions';
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
    public current$: Observable<number>;
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
        this.store$.select(fromRoot.getPaginationCurrent)
            .subscribe(x => {
                console.log(x);
                this.current = x;
            });
    }

    ngOnInit() { }

    ngOnDestroy() { }

    public onPrev() {
        console.log(this.current);
        this.store$.dispatch(new Backward({ offset: -this.base }));
        this.store$.dispatch(new SetCurrent(this.current - 1));
    }

    public onNext() {
        this.store$.dispatch(new Forward({ offset: this.base }));
        this.store$.dispatch(new SetCurrent(this.current + 1));
    }

    public goTo(pageNumber: number) {
        this.store$.dispatch(new GoTo({ offset: pageNumber * this.base }));
        this.store$.dispatch(new SetCurrent(pageNumber));
    }
}
