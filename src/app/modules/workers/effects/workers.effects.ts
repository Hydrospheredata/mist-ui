import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpWorkersService } from '@workers/services';
import { Worker } from '@shared/models';
import * as workersActions from '@workers/actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class WorkersEffects {
    @Effect() getWorkers$: Observable<Action> = this.actions$
        .ofType(workersActions.WorkersActionTypes.Get)
        .pipe(
            switchMap(() => {
                return this.workersService.getAll()
                    .pipe(
                        map((workers: Worker[]) => new workersActions.GetSuccess(workers)),
                        catchError(error => of(new workersActions.GetFail(error)))
                    )
            })
        );

    constructor(
        private actions$: Actions,
        private workersService: HttpWorkersService
    ) { }
}