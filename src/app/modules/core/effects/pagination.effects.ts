import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { PaginationActionTypes, Forward, Backward, GoTo } from '@app/modules/core/actions';
import { tap, map } from 'rxjs/operators';
import * as fromJobsActions from '@jobs/actions';
import { MistState } from '@app/modules/core/reducers';

@Injectable()
export class PaginationEffects {
    @Effect({ dispatch: false }) forward$: Observable<Action> = this.actions$
        .ofType(PaginationActionTypes.Forward)
        .pipe(
            map((action: Forward) => action.options),
            tap((options) => this.store$.dispatch(new fromJobsActions.Get(options)))
        );

    @Effect({ dispatch: false }) backward$: Observable<Action> = this.actions$
        .ofType(PaginationActionTypes.Backward)
        .pipe(
            map((action: Backward) => action.options),
            tap((options) => this.store$.dispatch(new fromJobsActions.Get(options)))
        );

    @Effect({ dispatch: false }) goTo$: Observable<Action> = this.actions$
        .ofType(PaginationActionTypes.GoTo)
        .pipe(
            map((action: GoTo) => action.options),
            tap((options) => this.store$.dispatch(new fromJobsActions.Get(options)))
        );

    constructor(
        private actions$: Actions,
        private store$: Store<MistState>,
    ) { }
}