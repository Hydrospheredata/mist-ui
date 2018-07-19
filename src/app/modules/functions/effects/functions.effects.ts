import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { FunctionActionTypes } from '@app/modules/functions/actions';
import { HttpFunctionService } from '@app/modules/functions/services';
import { Function } from '@app/modules/shared/models';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as FunctionsActions from '@app/modules/functions/actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FunctionsEffects {
    @Effect() getAllFunctions$: Observable<Action> = this.actions$
        .ofType(FunctionActionTypes.Get)
        .pipe(
            switchMap(() => {
                return this.functionService.getAll()
                    .pipe(
                        map((functions: Function[]) => new FunctionsActions.GetSuccess(functions)),
                        catchError(error => of(new FunctionsActions.GetFail(error)))
                    )
            })
        )

    constructor(
        private actions$: Actions,
        private functionService: HttpFunctionService
    ) { }
}