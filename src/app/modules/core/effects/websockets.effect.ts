import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as fromWS from '@core/actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { WebSocketJobService } from '@jobs/services';
import { of } from 'rxjs/observable/of';
import * as fromJobs from '@jobs/actions';

@Injectable()
export class WebsocketEffects {
    @Effect() wsConnect$: Observable<Action> = this.actions$
        .ofType(fromWS.WebsocketActionTypes.WsConnect)
        .pipe(
            switchMap(() => {
                return this.wsService.connect()
                    .pipe(
                        map(messages => new fromJobs.Update(messages)),
                        catchError(() => of(new fromWS.WsConnect))
                    )
            })
        );

    constructor(
        private actions$: Actions,
        private wsService: WebSocketJobService
    ) { }
}