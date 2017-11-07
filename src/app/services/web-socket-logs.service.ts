import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { WebsocketService } from '@services/websocket.service';
import { Location } from '@angular/common';

@Injectable()
export class WebSocketLogsService extends WebsocketService{

  private subject: Subject<MessageEvent>;
  private baseUrl: string;
  private ws: WebSocket;

  constructor(private location: Location) {
    super(location);
    this.baseUrl = `${this.apiUrl}/ws/jobs/`;
  }

  public connect(id): Observable<any> {
    if (!this.subject) {
      let url = this.baseUrl + `${id}`;
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

  public disconnect(): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }

}
