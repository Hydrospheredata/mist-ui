import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, ReplaySubject, Subscription } from "rxjs";
import { switchMap, filter, take, map } from "rxjs/operators";
import { WebSocketLogsService } from '@jobs/services/logs.service/web-socket-logs.service'

//Store
import * as fromJobLogs from '@app/modules/jobs/reducers';
import * as fromJobLogsActions from '@app/modules/jobs/actions'
import { Store } from '@ngrx/store';
import { MistState } from '@app/modules/core/reducers';

enum logTypes {
    'Debug' = 1,
    'Info',
    'Warn',
    'Error'
}

@Injectable()
export class LogsService {
    private logs$ = new BehaviorSubject<any[]>([]);
    private wsLogs$ = new ReplaySubject();

    private logSubscription: Subscription;
    private wsSubscription: Subscription;

    public getLogs(): Observable<any> {
        this.getLogsByWebSockets();

        this.logSubscription = this.getLogsByHttp().pipe(
            switchMap(logsByHttp => {
                this.updateLogs(logsByHttp);
                return this.wsLogs$
            })
        ).subscribe(events => { this.updateLogs(events); })
        
        return this.logs$;
    }

    private getLogsByHttp(): Observable<any>{
        return this.store.select(fromJobLogs.getJobLogsIsLoading).pipe(
            filter(isLoading => isLoading === false),
            switchMap(_ => this.store.select(fromJobLogs.getJobLogs))
        );
    }

    private getLogsByWebSockets(): void {
        this.wsSubscription = this.getCurrentJobId().pipe(
            switchMap(jobId => this.ws.connect(jobId)),
            filter(message => message.event === 'logs'),
            map(message => message.events),
        ).subscribe(
            events => this.wsLogs$.next(events.map((event) => this.normalizeEvent(event)))
        );
    }

    private getCurrentJobId(): Observable<any>{
        return this.store.select(fromJobLogs.getSelectedJobId).pipe(take(1))
    }

    private normalizeEvent(event) {
        if(!event){ return }

        let date = new Date(event.timeStamp);
        return {
            type: this.getLogType(Number(event.level)),
            date: date.toJSON(),
            jobId: event.from,
            message: event.message
        }
    }

    private  getLogType(logType: number) {
        return logTypes[logType].toUpperCase();
    }

    private updateLogs(messages): void {
        const updatedLogList = [
            ...this.logs$.getValue(),
            ...messages
        ];

        this.logs$.next(updatedLogList);
    }

    public unsubscribe(): void {
        if(this.logSubscription) {
            this.logSubscription.unsubscribe();
        }

        if(this.wsSubscription) {
            this.wsSubscription.unsubscribe();
        }

        this.ws.disconnect();
    }

    constructor(
        private store: Store<MistState>,
        private ws: WebSocketLogsService,
    ){
        this.store.dispatch(new fromJobLogsActions.GetLogs);
    }
}