import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { FilterActionTypes, SetFilter, SetFilterSuccess } from '@app/modules/core/actions';
import { map, tap, switchMap } from 'rxjs/operators';
import { MistState } from '@app/modules/core/reducers';

import * as fromFilterActions from '@core/actions';
import * as fromJobsActions from '@jobs/actions';
import { Filter } from '@app/modules/shared/models';

@Injectable()
export class FilterEffects {
    @Effect({ dispatch: false }) getFilterOptions$: Observable<Action> = this.actions$
        .ofType(FilterActionTypes.GetFilter)
        .pipe(
            tap(() => {
                const filterOptions = this.getFilterOptionsFromLocalStorage;
                if (filterOptions) {
                    this.store$.dispatch(new fromFilterActions.SetFilterSuccess(filterOptions));
                } else {
                    const defaultFilterOptions = { success: true, running: true, failed: true };
                    this.setFilterOptionsToLocalStorage(defaultFilterOptions);
                    this.store$.dispatch(new fromFilterActions.SetFilterSuccess(defaultFilterOptions));
                }
            })
        )

    @Effect({ dispatch: false }) setFilter$: Observable<Action> = this.actions$
        .ofType(FilterActionTypes.SetFilter)
        .pipe(
            map((action: SetFilter) => action.option),
            tap((option) => {
                const filterOptions = this.getFilterOptionsFromLocalStorage;
                const updatedFilterOptions = { ...filterOptions, [option]: !filterOptions[option] };
                this.setFilterOptionsToLocalStorage(updatedFilterOptions);
                this.store$.dispatch(new fromFilterActions.SetFilterSuccess(updatedFilterOptions));
                this.store$.dispatch(new fromJobsActions.Get())
            })
        );

    private setFilterOptionsToLocalStorage(options: Filter) {
        localStorage.setItem('filterOptions', JSON.stringify(options));
    }

    private get getFilterOptionsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('filterOptions'));
    }


    constructor(
        private actions$: Actions,
        private store$: Store<MistState>,
    ) { }
}