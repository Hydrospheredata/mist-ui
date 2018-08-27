import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as fromJobLogsActions from '@app/modules/jobs/actions';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { HttpLogsService } from '@app/modules/jobs/services';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobs from '@app/modules/jobs/reducers';
import { of } from 'rxjs/observable/of';

@Injectable()
export class JobLogsEffects {
    @Effect() getLogs$: Observable<Action> = this.actions$
        .ofType(fromJobLogsActions.JobLogsActionTypes.GetLogs)
        .pipe(
            withLatestFrom(
                this.store.select(fromJobs.getSelectedJobId)
            ),
            switchMap(([action, jobId]) => {
                return this.jobLogsService.get(jobId)
                    .pipe(
                        map((logs: string[]) => {
                            const regexp = /([a-zA-Z0-9_\-.,!?:…[\]]+)/g;
                            const logsNew = [];
                            logs.forEach(log => {
                                let charIndex = log.indexOf(']');
                                let logObject = {};
                                if (charIndex !== -1) {
                                    let message = log.slice(charIndex + 2);
                                    let logsArray = log.match(regexp);
                                    logObject = {
                                        type: logsArray[0],
                                        date: logsArray[1],
                                        jobId: logsArray[2],
                                        message: message
                                    }
                                } else {
                                    logObject = {
                                        message: log
                                    }
                                }
                                logsNew.push(logObject);
                            });
                            return new fromJobLogsActions.GetLogsSuccess(logsNew)
                        }),
                        catchError(error => of(new fromJobLogsActions.GetLogsFail(error)))
                    )

            })
        );

    constructor(
        private actions$: Actions,
        private store: Store<MistState>,
        private jobLogsService: HttpLogsService
    ) { }
}