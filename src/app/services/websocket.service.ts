import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebsocketService {

    protected apiUrl: string;
    protected port: string;

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

}
