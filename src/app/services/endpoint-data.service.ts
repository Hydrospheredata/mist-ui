import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Endpoint } from '../models/endpoint';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EndpointDataService {
  private coreApiUrl: string;

  constructor(private http: Http) {
    this.coreApiUrl = `${environment.host}:${environment.port}/v2/api/endpoints`
  }

  public getAll(): Observable<Endpoint[]> {
    return this.http.get(this.coreApiUrl)
                    .map((res: Response) => res.json() as Endpoint[])
                    .catch(this.handleError);
  }

  public runJob(id: string, args = '{}') {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrl = this.coreApiUrl + `/${id}`
    return this.http.post(apiUrl, args, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data = res.json();
    return data || {};
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
