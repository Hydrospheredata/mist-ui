import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Job } from '../models/job';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JobDataService {
  jobs: Observable<Job[]>;
  private _jobs: BehaviorSubject<Job[]>;
  private baseUrl: string;
  private dataStore: { jobs: Job[] };

  constructor(private http: Http) {
    this.baseUrl = `${environment.host}:${environment.port}/v2/api`
    this.dataStore = { jobs: [] };
    this._jobs = <BehaviorSubject<Job[]>>new BehaviorSubject([]);
    this.jobs = this._jobs.asObservable();
  }

  public getAllByEndpointId(endpointId: string) {
    let apiUrl = this.baseUrl + `/endpoints/${endpointId}/jobs`
    this.http.get(apiUrl)
             .map(this.extractData)
             .catch(this.handleError)
             .subscribe((data) => {
               this.dataStore.jobs = data;
               this._jobs.next(Object.assign({}, this.dataStore).jobs);
             })
  }

  public create(endpointId: string, args: string) {
    let apiUrl = this.baseUrl + `/${endpointId}`
    this.http.post(apiUrl, args, options)
             .map(this.extractData)
             .catch(this.handleError)
             .subscribe((data) => {})
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
