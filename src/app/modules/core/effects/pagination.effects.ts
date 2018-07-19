import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class PaginationEffects {
    @Effect() name$: Observable<Action> = this.actions$.ofType('ACTIONTYPE');

    constructor(
        private actions$: Actions
    ) { }
}