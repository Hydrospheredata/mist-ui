import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { JobEndpoint } from '../models/job-endpoint';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JobEndpointsDataService {
  private coreApiUrl: string;

  constructor(private http: Http) {
    this.coreApiUrl = `${environment.host}:${environment.port}/v2/api/jobs/`
  }

  public getAll() : Observable<JobEndpoint[]> {
    let apiUrl = this.coreApiUrl + 'endpoints'
    return this.http.get(apiUrl)
                    .map(this.extractEndpoints)
                    .catch(this.handleError);
  }

  public runJob(jobEndpointId: string, args = '{}') {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrl = this.coreApiUrl + jobEndpointId
    return this.http.post(apiUrl, args, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private extractEndpoints(res: Response) {
    let jsonData = res.json();
    let endpoints :JobEndpoint[] = [];
    for(let index in jsonData){
      let endpoint = jsonData[index]
      let newEndpoint = {
        name: endpoint.name,
        lang: endpoint.lang,
        tags: endpoint.tags,
        execute: JSON.stringify(endpoint.execute)
      }
      endpoints.push(newEndpoint);
    }
    return endpoints;
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
