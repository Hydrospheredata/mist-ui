import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpService } from '@app/modules/core/services/http.service/http.service';



@Injectable()
export class StatusService {

    constructor(
        private http: HttpService
    ) { }

    getStatus() {
        return this.http.get('/status')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.text() || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${body}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

}
