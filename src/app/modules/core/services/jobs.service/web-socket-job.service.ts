import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from '@app/modules/core/services/websocket.service/websocket.service';
import { Location } from '@angular/common';



@Injectable()
export class WebSocketJobService extends WebsocketService {

    public static readonly RUNNING_EVENTS: string[] = ['initialized', 'queued', 'started', 'worker-assigned', 'job-file-downloading', 'cancelling'];
    public static readonly FAILED_EVENTS: string[] = ['cancelled', 'failed'];
    public static readonly FINISHED_EVENTS: string[] = ['finished'];

    constructor(
        private location: Location
    ) {
        super(
            location
        );
        this.baseUrl = `${this.apiUrl}/ws/all`;
    }

    public getEvents(): string[] {
        return WebSocketJobService.RUNNING_EVENTS
            .concat(WebSocketJobService.FAILED_EVENTS)
            .concat(WebSocketJobService.FINISHED_EVENTS)
    }

    public getRunningEvents(): string[] {
        return WebSocketJobService.RUNNING_EVENTS;
    }

    public getFailedEvents(): string[] {
        return WebSocketJobService.FAILED_EVENTS;
    }

    public getFinishedEvents(): string[] {
        return WebSocketJobService.FINISHED_EVENTS;
    }

    public connect(): Observable<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create();
        }
        return this.subject;
    }

}
