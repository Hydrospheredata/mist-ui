import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Job } from '@models/job';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpJobService {
  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = `${environment.host}:${environment.port}/v2/api`
  }

  public getAll(): Observable<Job[]> {
    let apiUrl = this.baseUrl + `/jobs`
    return this.http.get(apiUrl)
             .map((res: Response) => { return this.extractJobs(res) })
             .catch(this.handleError)
  }

  public getByEndpoint(endpointId: string): Observable<Job[]> {
    let apiUrl = this.baseUrl + `/endpoints/${endpointId}/jobs`
    return this.http.get(apiUrl)
             .map((res: Response) => { return this.extractJobs(res) })
             .catch(this.handleError)
  }

  public get(id: string): Observable<Job> {
    let apiUrl = this.baseUrl + `/jobs/${id}`
    return this.http.get(apiUrl)
             .map((res: Response) => { return this.extractJob(res) })
             .catch(this.handleError)
  }

  public create(endpointId: string, args: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrl = this.baseUrl + `/endpoints/${endpointId}/jobs`
    return this.http.post(apiUrl, JSON.stringify(JSON.parse(args)), options)
             .map(this.extractData)
             .catch(this.handleError)
  }

  public kill(jobId: string): Observable<Job> {
    let apiUrl = this.baseUrl + `/jobs/${jobId}`
    return this.http.delete(apiUrl)
             .map((res: Response) => { return this.extractJob(res) })
             .catch(this.handleError)
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
