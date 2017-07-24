import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpLogsService {

  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = `${environment.host}:${environment.port}/v2/api/jobs`
  }

  public get(jobId: string): Observable<string[]> {
    let apiUrl = this.baseUrl + `/${jobId}/logs`;
    return this.http.get(apiUrl).map((res: Response) => {
      return res['_body'].split('\n');
    }).catch(this.handleError);
  }

  private handleError(error: Response | any): Observable<any> {
    let errMsg: string;
    switch (error.status) {
      case 404:
        errMsg = error._body
        break;
      default:
        errMsg = error.message ? error.message : error.toString();
        break;
    }
    return Observable.throw(errMsg);
  }

}
