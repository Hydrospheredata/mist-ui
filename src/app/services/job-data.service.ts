import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Job } from '@models/job';
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
             .map((res: Response) => { return this.extractJobs(res) })
             .catch(this.handleError)
             .subscribe((data) => {
               this.dataStore.jobs = data;
               this.updateStore();
             })
  }

  public get(id: string) {
    let apiUrl = this.baseUrl + `/jobs/${id}`
    this.http.get(apiUrl)
             .map((res: Response) => { return this.extractJob(res) })
             .catch(this.handleError)
             .subscribe((job) => {
               this.updateItem(job);
               this.updateStore();
             })
  }

  public create(endpointId: string, args: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrl = this.baseUrl + `/endpoints/${endpointId}/jobs`
    this.http.post(apiUrl, JSON.stringify(JSON.parse(args)), options)
             .map(this.extractData)
             .catch(this.handleError)
             .subscribe((data) => {
               this.get(data.id);
             })
  }

  public delete(jobId: string) {
    let apiUrl = this.baseUrl + `/jobs/${jobId}`
    this.http.delete(apiUrl)
             .map((res: Response) => { return this.extractJob(res) })
             .catch(this.handleError)
             .subscribe((data) => {
               let job = this.dataStore.jobs.find(item => item.jobId === data.jobId );
               let index: number = this.dataStore.jobs.indexOf(job);
               this.dataStore.jobs.splice(index, 1, data);
               this.updateStore();
             })
  }

  private updateStore() {
    this._jobs.next(Object.assign({}, this.dataStore).jobs);
  }

  private updateItem(job: Job) {
    const idx = this.dataStore.jobs.findIndex((item) => item.jobId === job.jobId);
    if (idx === -1) {
      this.dataStore.jobs.push(job);
    } else {
      this.dataStore.jobs[idx] = job;
    }
  }

  private extractJobs(res: Response) {
    let data = res.json();
    let jobs :Job[] = [];
    for(let index in data){
      let job = this.toJob(data[index])
      jobs.push(job);
    }
    return jobs
  }

  private extractJob(res: Response) {
    let data = res.json();
    return this.toJob(data)
  }

  private toJob(data): Job {
    let job = new Job({
      jobId: data.jobId,
      status: data.status,
      context: data.context,
      createTime: data.createTime,
      startTime: data.startTime,
      endTime: data.endTime,
      endpoint: data.endpoint,
      jobResult: JSON.stringify(data.jobResult, null, "\t"),
      params: JSON.stringify(data.params, null, "\t"),
      source: data.source
    })
    return job
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
