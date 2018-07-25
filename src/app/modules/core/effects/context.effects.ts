import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { GetContextSuccess, ContextActionTypes, AddContext, AddContextSuccess, AddContextFail } from '@core/actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpContextsService } from '@app/modules/core/services/_index';
import { Context } from '@app/modules/shared/models';
import { of } from 'rxjs/observable/of';
import { MdlSnackbarService } from '../../../../../node_modules/@angular-mdl/core';

@Injectable()
export class ContextEffects {
    @Effect() getContext$: Observable<Action> = this.actions$
        .ofType(ContextActionTypes.GetContext)
        .pipe(
            switchMap(() => {
                return this.contextService.get()
                    .pipe(
                        map((context: Context[]) => new GetContextSuccess(context))
                    )
            })
        );

    @Effect() addContext$: Observable<Action> = this.actions$
        .ofType(ContextActionTypes.AddContext)
        .pipe(
            map((action: AddContext) => action.context),
            switchMap((context: Context) => {
                return this.contextService.create(context)
                    .pipe(
                        map(response => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Context ${response.name} successfully added`,
                                timeout: 5000
                            });
                            return new AddContextSuccess(context)
                        }),
                        catchError(error => of(new AddContextFail(error)))
                    )
            })
        )

    constructor(
        private actions$: Actions,
        private contextService: HttpContextsService,
        private mdlSnackbarService: MdlSnackbarService
    ) { }
}