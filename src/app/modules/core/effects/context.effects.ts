import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ContextActions, ContextActionTypes } from '@core/actions';

@Injectable()
export class ContextEffects {
    @Effect() name$: Observable<Action> = this.actions$
        .ofType(ContextActionTypes.GetContext);

    constructor(
        private actions$: Actions
    ) { }
}