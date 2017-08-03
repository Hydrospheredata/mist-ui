import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { WebsocketService } from '@services/websocket.service';

@Injectable()
export class WebSocketJobService extends WebsocketService {

  private subject: Subject<MessageEvent>;
  private baseUrl: string;

  public static readonly RUNNING_EVENTS: string[] = ['initialized', 'queued', 'started'];
  public static readonly FAILED_EVENTS: string[] = ['canceled', 'failed'];
  public static readonly FINISHED_EVENTS: string[] = ['finished'];

  constructor() {
    super();
    this.baseUrl = `${this.apiUrl}/ws`;
  }

  public getEvents(): string[] {
     return WebSocketJobService.RUNNING_EVENTS
              .concat(WebSocketJobService.FAILED_EVENTS)
              .concat(WebSocketJobService.FINISHED_EVENTS)
  }

  public getRunningEvents(): string[] {
    return  WebSocketJobService.RUNNING_EVENTS;
  }

  public getFailedEvents(): string[] {
    return  WebSocketJobService.FAILED_EVENTS;
  }

  public getFinishedEvents(): string[] {
    return  WebSocketJobService.FINISHED_EVENTS;
  }

  public connect(): Observable<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create();
      console.log('Successfully connected: ' + this.baseUrl);
    }
    return this.subject.map((message) => { return message; });
  }

  private create(): Subject<MessageEvent> {
    let ws = new WebSocket(this.baseUrl);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);

        return ws.close.bind(ws);
      });

    return Subject.create({}, observable);
  }

}
