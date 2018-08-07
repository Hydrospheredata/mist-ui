import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/dom/webSocket';



@Injectable()
export class WebsocketService {

    protected apiUrl: string;
    protected baseUrl: string;
    protected port: string;
    protected subject;
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

    protected create(url: string = '', withLogs: boolean = false): Subject<MessageEvent> {
        let wsUrl = url ? url : this.baseUrl;
        wsUrl = `${wsUrl}?withLogs=${withLogs}`;
        console.log(wsUrl);
        this.subject = Observable.webSocket(wsUrl);

        return this.subject;
    }

    public disconnect() {
        this.subject.unsubscribe();
    }

}
