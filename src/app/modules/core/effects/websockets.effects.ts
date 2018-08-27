import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as WSActions from '@app/modules/core/actions';
import { switchMap, map, catchError, filter, withLatestFrom } from 'rxjs/operators';
import { WebSocketJobService, WebSocketLogsService } from '@app/modules/jobs/services';
import { of } from 'rxjs/observable/of';
import * as fromJobs from '@app/modules/jobs/actions';
import { MistState } from '@app/modules/core/reducers';
import * as fromJobsSelectors from '@app/modules/jobs/reducers';

@Injectable()
export class WebsocketEffects {

    @Effect() wsConnect$: Observable<Action> = this.actions$
        .ofType(WSActions.WebsocketActionTypes.WsConnect)
        .pipe(
            switchMap(() => {
                return this.wsService.connect()
                    .pipe(
                        filter((message: any) => message.event !== 'keep-alive'),
                        map(message => new fromJobs.Update(message)),
                        catchError(() => of(new WSActions.WsConnect))
                    )
            })
        );

    @Effect() wsLogsConnect$: Observable<Action> = this.actions$
        .ofType(WSActions.WebsocketActionTypes.WsLogsConnect)
        .pipe(
            withLatestFrom(
                this.store.select(fromJobsSelectors.getSelectedJobId)
            ),
            switchMap(([action, jobId]) => {
                console.log(jobId);
                return this.wsLogsService.connect(jobId)
                    .pipe(
                        filter((message: any) => {
                            console.log(message);
                            return message.event !== 'keep-alive'
                        }),
                        map(message => {
                            console.log(message);
                            return new fromJobs.Update(message)
                        }),
                        catchError(() => of(new WSActions.WsConnect))
                    )
            })
        );

    // @Effect() wsLogsDisconnect$: Observable<Action> = this.actions$
    //     .ofType(WSActions.WebsocketActionTypes.WsLogsDisconnect)
    //     .pipe(
    //         switchMap(() => {
    //             return of(this.wsLogsService.disconnect())

    //         })
    //     );

    constructor(
        private actions$: Actions,
        private store: Store<MistState>,
        private wsService: WebSocketJobService,
        private wsLogsService: WebSocketLogsService
    ) { }
}