import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { JobActionTypes } from '@jobs/actions';
import { HttpJobService } from '@jobs/services';
import { Job } from '@shared/models';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import * as JobsActions from '@jobs/actions';
import { of } from 'rxjs/observable/of';
import { MdlSnackbarService } from '@angular-mdl/core';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@jobs/reducers';

@Injectable()
export class JobsEffects {

    @Effect() getAllJobs$: Observable<Action> = this.actions$
        .ofType(JobActionTypes.Get)
        .pipe(
            switchMap(() => {
                return this.jobService.getAll()
                    .pipe(
                        map((jobs: Job[]) => new JobsActions.GetSuccess(jobs)),
                        catchError(error => of(new JobsActions.GetFail(error)))
                    )
            })
        )

    @Effect() getJob$: Observable<Action> = this.actions$
        .ofType(JobActionTypes.GetById)
        .pipe(
            map((action: JobsActions.GetById) => action.id),
            withLatestFrom(
                this.store.select(fromJobs.getJobEntities)
            ),
            switchMap(([jobId, entities]) => {
                return this.jobService.getJob(jobId)
                    .pipe(
                        map((job: Job) => {
                            if (entities[job.jobId]) {
                                return new JobsActions.UpdateSuccess(job);
                            }
                            return new JobsActions.AddSuccess(this.transformMessageToJob(job));
                        }),
                        catchError(error => of(new JobsActions.GetFail(error)))
                    )
            })
        )

    @Effect() addJob$: Observable<Action> = this.actions$
        .ofType(JobActionTypes.Add)
        .pipe(
            map((action: JobsActions.Add) => action),
            switchMap(params => {
                return this.jobService.create(params.functionId, params.params)
                    .pipe(
                        map(job => {
                            console.log(job);
                            this.mdlSnackbarService.showSnackbar({
                                message: `Job ${job.id} initialisation was successful`,
                                timeout: 5000
                            });
                            return new JobsActions.GetById(job.id);
                        }),
                        catchError(error => of(new JobsActions.AddFail(error)))
                    )
            })
        )

    @Effect() updateJob$: Observable<Action> = this.actions$
        .ofType(JobActionTypes.Update)
        .pipe(
            map((action: JobsActions.Update) => action.payload),
            withLatestFrom(
                this.store.select(fromJobs.getJobEntities)
            ),
            switchMap(([message, entities]) => {
                if (entities[message.id]) {
                    return of(new JobsActions.UpdateSuccess(this.transformMessageToJob(message)));
                }
                return of(new JobsActions.AddSuccess(this.transformMessageToJob(message)));
            })
        )

    @Effect() deleteJob$: Observable<Action> = this.actions$
        .ofType(JobActionTypes.Delete)
        .pipe(
            map((action: JobsActions.Delete) => action.jobId),
            switchMap((jobId: string) => {
                return this.jobService.kill(jobId)
                    .pipe(
                        map(res => {
                            return new JobsActions.DeleteSuccess(res);
                        })
                    )
            })
        )

    private transformMessageToJob(message): Job {
        let job = new Job(message);
        job.jobId = message.id;
        job.status = message.event;
        return JSON.parse(JSON.stringify(job));
    }

    constructor(
        private actions$: Actions,
        private jobService: HttpJobService,
        private mdlSnackbarService: MdlSnackbarService,
        private store: Store<MistState>
    ) { }
}