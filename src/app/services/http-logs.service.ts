import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

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
    })
  }

}
