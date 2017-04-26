import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { JobEndpoint } from '../models/job-endpoint';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JobEndpointsDataService {
  private routesApiUrl: string;

  constructor(private http: Http) {
    this.routesApiUrl = `${environment.host}:${environment.port}/v2/api/jobs/endpoints`
  }

  public getAll() : Observable<JobEndpoint[]> {
    return this.http.get(this.routesApiUrl)
                    .map(this.extractData)
  }

  private extractData(res: Response) {
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
}
