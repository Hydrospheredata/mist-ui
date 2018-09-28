import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { WebsocketService } from '@app/modules/core/services';
import { Location } from '@angular/common';



@Injectable()
export class WebSocketLogsService extends WebsocketService {

    constructor(
        private location: Location
    ) {
        super(
            location
        );
        this.baseUrl = `${this.apiUrl}/ws/jobs/`;
    }

    public connect(id): Observable<any> {
            if(!id){ return };

            console.group('WS log service')
                console.log('subject: ' + this.subject);
                console.log('jobId: ' + id);
            console.groupEnd();

            let url = this.baseUrl + `${id}`;
            this.subject = this.create(url, true);
            console.log('Successfully connected: ' + url);

        return this.subject;
    }

}
