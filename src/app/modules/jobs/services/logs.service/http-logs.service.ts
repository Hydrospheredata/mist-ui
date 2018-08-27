import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpService } from '@app/modules/core/services';
import * as FileSaver from 'file-saver';
import { Logs } from 'selenium-webdriver';



@Injectable()
export class HttpLogsService {

    private baseUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseUrl = `/jobs`
    }

    public get(jobId: string): Observable<string[]> {
        const apiUrl = this.baseUrl + `/${jobId}/logs`;
        return this.http.get(apiUrl)
            .map((res: Response) => res['_body'].split('\n'))
            .catch(this.handleError);
    }

    public downloadLogs(jobId: string) {
        const fileName = `${jobId}.log`;
        this.get(jobId)
            .subscribe((logs) => {
                const blob = new Blob([logs.join('\n')], { type: 'application/text' });
                FileSaver.saveAs(blob, fileName);
            });
    }

    private handleError(error: Response | any): Observable<any> {
        let errMsg: string;
        switch (error.status) {
            case 404:
                errMsg = error._body;
                break;
            default:
                errMsg = error.message ? error.message : error.toString();
                break;
        }
        return Observable.throw(errMsg);
    }

}
