import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';



@Injectable()
export class WebsocketService {

    protected apiUrl: string;
    protected baseUrl: string;
    protected port: string;
    protected subject: Subject<MessageEvent>;
    protected ws: WebSocket;

    constructor(
        location: Location
    ) {
        this.port = environment.production ? window.location.port : environment.port;
        let url = 'ws';
        if (window.location.protocol.indexOf('s') >= 0) {
            url += 's';
        }
        const path = location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
        this.apiUrl = `${url}://${window.location.hostname}:${this.port}${path}`;
    }

    protected create(url: string = ''): Subject<MessageEvent> {
        this.ws = new WebSocket(url ? url : this.baseUrl);

        let observable = Observable.create((obs: Observer<MessageEvent>) => {
            this.ws.onmessage = obs.next.bind(obs);
            this.ws.onerror = obs.error.bind(obs);
            this.ws.onclose = obs.complete.bind(obs);

            return this.ws.close.bind(this.ws);
        });

        return Subject.create({}, observable);
    }

    public disconnect() {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.close();
        }
    }

}
