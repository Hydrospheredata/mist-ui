import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Job } from '../models/job';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JobDataService {
  private coreApiUrl: string;

  constructor(private http: Http) {
    this.coreApiUrl = `${environment.host}:${environment.port}/v2/api/endpoints`
  }

  public getAllByEndpointId(endpointId: string): Observable<Job[]> {
    let apiUrl = this.coreApiUrl + `/${endpointId}/jobs`
    return this.http.get(apiUrl)
                    .map((res: Response) => res.json() as Job[])
                    .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
