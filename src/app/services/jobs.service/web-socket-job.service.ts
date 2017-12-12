import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { WebsocketService } from '../websocket.service/websocket.service';
import { Location } from '@angular/common';



@Injectable()
export class WebSocketJobService extends WebsocketService {

    public static readonly RUNNING_EVENTS: string[] = ['initialized', 'queued', 'started'];
    public static readonly FAILED_EVENTS: string[] = ['canceled', 'failed'];
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
            console.log('Successfully connected: ' + this.baseUrl);
        }
        return this.subject.map((message) => { return message; });
    }

}
