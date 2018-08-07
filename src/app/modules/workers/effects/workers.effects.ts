import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HttpWorkersService } from '@app/modules/workers/services';
import { Worker, Job } from '@app/modules/shared/models';
import * as workersActions from '@app/modules/workers/actions';
import * as fromWorkers from '@app/modules/workers/reducers';
import { of } from 'rxjs/observable/of';
import { MistState } from '@app/modules/core/reducers';

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

    @Effect() deleteWorker$: Observable<Action> = this.actions$
        .ofType(workersActions.WorkersActionTypes.Delete)
        .pipe(
            map((action: workersActions.Delete) => action.workerName),
            switchMap((workerName: string) => {
                return this.workersService.delete(workerName)
                    .pipe(
                        map(() => new workersActions.DeleteSuccess(workerName)),
                        catchError(error => of(new workersActions.DeleteFail(error)))
                    )
            })
        );

    @Effect() getWorkerJobs$: Observable<Action> = this.actions$
        .ofType(workersActions.WorkersActionTypes.GetJobsForWorker)
        .pipe(
            withLatestFrom(
                this.store$.select(fromWorkers.getCurrentWorkerId)
            ),
            switchMap(([action, workerId]) => {
                return this.workersService.getJobs(workerId)
                    .pipe(
                        map((jobs: Job[]) => new workersActions.GetJobsForWorkerSuccess(jobs)),
                        catchError(error => of(new workersActions.GetJobsForWorkerFail(error)))
                    )
            })
        )

    constructor(
        private actions$: Actions,
        private workersService: HttpWorkersService,
        private store$: Store<MistState>
    ) { }
}