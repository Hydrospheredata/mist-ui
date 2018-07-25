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
import { MdlSnackbarService } from '../../../../../node_modules/@angular-mdl/core';

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

    @Effect() addFunction$: Observable<Action> = this.actions$
        .ofType(FunctionActionTypes.Add)
        .pipe(
            map((action: FunctionsActions.Add) => action.payload),
            switchMap(functionInfo => {
                return this.functionService.createFunction(functionInfo)
                    .pipe(
                        map((functionInfo: Function) => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `${functionInfo.name} has been successfully added`,
                                timeout: 5000
                            });
                            return new FunctionsActions.AddSuccess(functionInfo)
                        }),
                        catchError(error => of(new FunctionsActions.GetFail(error)))
                    )
            })
        )

    @Effect() updateFunction$: Observable<Action> = this.actions$
        .ofType(FunctionActionTypes.Update)
        .pipe(
            map((action: FunctionsActions.Update) => action.payload),
            switchMap(functionInfo => {
                return this.functionService.updateFunction(functionInfo)
                    .pipe(
                        map((functionInfo: Function) => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `${functionInfo.name} has been successfully updated`,
                                timeout: 5000
                            });
                            return new FunctionsActions.UpdateSuccess(functionInfo)
                        }),
                        catchError(error => of(new FunctionsActions.GetFail(error)))
                    )
            })
        )

    constructor(
        private actions$: Actions,
        private functionService: HttpFunctionService,
        private mdlSnackbarService: MdlSnackbarService,
    ) { }
}