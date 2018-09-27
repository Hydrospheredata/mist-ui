import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { JobActionTypes } from '@app/modules/jobs/actions';
import { HttpJobService } from '@app/modules/jobs/services';
import { Job } from '@app/modules/shared/models';
import { switchMap, map, catchError, withLatestFrom, concatMap } from 'rxjs/operators';
import * as JobsActions from '@app/modules/jobs/actions';
import { of } from 'rxjs/observable/of';
import { MdlSnackbarService } from '@angular-mdl/core';
import { MistState, getFilterOptions, getRouterParams } from '@app/modules/core/reducers';
import * as fromJobs from '@app/modules/jobs/reducers';
import { Router } from '@angular/router';
import * as fromWorkerActions from '@workers/actions';
import { HttpFunctionService } from '@app/modules/functions/services';

@Injectable()
export class JobsEffects {

    // @Effect() getAllJobs$: Observable<Action> = this.actions$
    //     .ofType(JobActionTypes.Get)
    //     .pipe(
    //         switchMap(() => {
    //             return this.jobService.getAll()
    //                 .pipe(
    //                     map((jobs: Job[]) => new JobsActions.GetSuccess(jobs)),
    //                     catchError(error => of(new JobsActions.GetFail(error)))
    //                 )
    //         })
    //     )

    @Effect() getJobsWithPagination$: Observable<Action> = this.actions$
        .ofType(JobActionTypes.Get)
        .pipe(
            map((action: JobsActions.Get) => action.options),
            withLatestFrom(
                this.store.select(getFilterOptions)
            ),
            switchMap(([options, filterOptions]) => {
                console.log({ pagination: options, filter: filterOptions });
                return this.jobService.get({ pagination: options, filter: filterOptions })
                    .pipe(
                        map((data) => new JobsActions.GetSuccess(data)),
                        catchError(error => of(new JobsActions.GetFail(error)))
                    )
            })
        )

    @Effect() getJobsByFunction$: Observable<Action> = this.actions$
        .ofType(JobActionTypes.GetByFunction)
        .pipe(
            map((action: JobsActions.GetByFunction) => action.options),
            withLatestFrom(
                this.store.select(getFilterOptions),
            ),
            switchMap(([options, filterOptions]) => {
                if (options.functionId === 'overview') {
                    return this.jobService.get({ pagination: options.pagination, filter: filterOptions })
                        .pipe(
                            map((data) => new JobsActions.GetSuccess(data)),
                            catchError(error => of(new JobsActions.GetFail(error)))
                        )
                }
                return this.jobService.getByFunctionId({ params: options.functionId, pagination: options.pagination, filter: filterOptions })
                    .pipe(
                        map((data) => new JobsActions.GetSuccess(data)),
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
                                return new JobsActions.UpdateSuccess(this.transformMessageToJob(job));
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
                            this.mdlSnackbarService.showSnackbar({
                                message: `Job ${job.id} initialisation was successful`,
                                timeout: 5000
                            });
                            return new JobsActions.GetById(job.id);
                        }),
                        catchError(error => {
                            console.log(error);
                            this.mdlSnackbarService.showSnackbar({
                                message: error,
                                timeout: 5000
                            });
                            return of(new JobsActions.AddFail(error))
                        })
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
                console.log(message);
                if (entities[message.id] && message.event !== 'logs') {
                    if (message.workerId) {
                        this.store.dispatch(new fromWorkerActions.Get);
                    }
                    this.checkRunningJobs(message);
                    return of(new JobsActions.UpdateSuccess(this.transformMessageToJob(message)));
                }
                this.checkRunningJobs(message);
                this.store.dispatch(new JobsActions.Increment);
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

        switch(message.event){
            case 'initialized':
                job.createTime = message.time || new Date().getTime();
                break;
            case 'started':
                job.startTime = message.time;
                break;
            case 'finished':
            case 'cancelled':
            case 'failed':
                job.endTime = message.time;
                break;
            default: 
                break;
        }

        if (message.result) {
            job.jobResult = message.result;
        }

        return this.removeEmpty(job);
    }

    private removeEmpty(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] && typeof obj[key] === 'object') this.removeEmpty(obj[key])
            else if (obj[key] == null) delete obj[key]
        });
        return obj;
    };

    private checkRunningJobs(message) {
        if (message.event === 'initialized') {
            this.store.dispatch(new JobsActions.AddRunning);
        }
        if (message.event === 'finished') {
            this.store.dispatch(new JobsActions.DeleteRunning);
        }
        if (message.event === 'failed') {
            this.store.dispatch(new JobsActions.DeleteRunning);
        }
        if (message.event === 'cancelled') {
            this.store.dispatch(new JobsActions.DeleteRunning);
        }
    }

    constructor(
        private actions$: Actions,
        private jobService: HttpJobService,
        private mdlSnackbarService: MdlSnackbarService,
        private store: Store<MistState>,
        private router: Router,
    ) { }
}