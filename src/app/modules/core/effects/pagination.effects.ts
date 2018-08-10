import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { PaginationActionTypes, Forward, Backward, GoTo } from '@app/modules/core/actions';
import { tap, map, withLatestFrom } from 'rxjs/operators';
import * as fromJobsActions from '@jobs/actions';
import { getRouterParams } from '@core/reducers';
import { MistState } from '@app/modules/core/reducers';

@Injectable()
export class PaginationEffects {
    @Effect({ dispatch: false }) pagination$: Observable<Action> = this.actions$
        .ofType(
            PaginationActionTypes.Forward,
            PaginationActionTypes.Backward,
            PaginationActionTypes.GoTo
        )
        .pipe(
            map((action: Forward | Backward | GoTo) => action.options),
            withLatestFrom(this.store$.select(getRouterParams)),
            tap((options: any) => {
                this.store$.dispatch(new fromJobsActions.GetByFunction({ pagination: options[0], functionId: options[1].functionId }))
            })
        );

    constructor(
        private actions$: Actions,
        private store$: Store<MistState>,
    ) { }
}