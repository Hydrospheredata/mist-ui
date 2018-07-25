import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as JobsRunningActions from '@jobs/actions'
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpJobService } from '@app/modules/jobs/services';
import { Job } from '@app/modules/shared/models';
import { of } from 'rxjs/observable/of';

@Injectable()
export class JobsRunningEffects {

    @Effect() getAllRunningJobs$: Observable<Action> = this.actions$
        .ofType(JobsRunningActions.JobsRunningActionTypes.GetRunning)
        .pipe(
            switchMap(() => {
                return this.jobService.where({ status: ['initialized', 'queued', 'started', 'job-file-downloading'] })
                    .pipe(
                        map((jobs: Job[]) => new JobsRunningActions.GetRunningSuccess(jobs.length)),
                        catchError(error => of(new JobsRunningActions.GetRunningFail(error)))
                    )
            })
        )

    constructor(
        private actions$: Actions,
        private jobService: HttpJobService
    ) { }
}