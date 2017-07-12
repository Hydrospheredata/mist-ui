import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WebSocketLogsService {

  private subject: Subject<MessageEvent>;
  private baseUrl: string;
  private ws: WebSocket;

  constructor() {
    this.baseUrl = `${environment.ws}:${environment.port}/v2/api/jobs/`;
  }

  public connect(id): Observable<any> {
    if (!this.subject) {
      let url = this.baseUrl + `${id}/ws`;
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }

    return this.subject.map((message) => {
      let data = JSON.parse(message.data);
      if (data.event === 'logs') return data.events[0]
    });
  }

  private create(url): Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);

        return this.ws.close.bind(this.ws);
      });

    return Subject.create({}, observable);
  }

  public disconnect(id): Subject<MessageEvent> {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    return this.subject;
  }

}
