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
             .map(this.extractJobs)
             .catch(this.handleError)
             .subscribe((jobs) => {
               this.dataStore.jobs = jobs;
               this._jobs.next(Object.assign({}, this.dataStore).jobs);
             })
  }

  public create(endpointId: string, args: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrl = this.baseUrl + `/${endpointId}`
    this.http.post(apiUrl, args, options)
             .map(this.extractData)
             .catch(this.handleError)
             .subscribe((data) => {})
  }

  private extractJobs(res: Response) {
    let data = res.json();
    let jobs :Job[] = [];
    for(let index in data){
      let job = data[index];
      let newJob = new Job({
        jobId: job.jobId,
        status: job.status,
        context: job.context,
        createTime: job.createTime,
        startTime: job.startTime,
        endTime: job.endTime,
        endpoint: job.endpoint,
        jobResult: JSON.stringify(job.jobResult),
        params: JSON.stringify(job.params),
        source: job.source
      })
      jobs.push(newJob);
    }
    return jobs
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
