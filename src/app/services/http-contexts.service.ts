import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Context } from '@models/context';

@Injectable()
export class HttpContextsService {
  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = `${environment.host}:${environment.port}/v2/api/contexts`;
  }

  public getContext(id?: string) {
    let url;

    if (!id) {
      url = this.baseUrl;
    } else {
      url = this.baseUrl + `/${id}`;
    }
    return this.http.get(url)
      .map( (contexts: Response) => {
        return contexts.json();
      })
  }

  public createContext(context: Context) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.baseUrl, JSON.stringify(context), options)
      .map((response) => {
        return response.json();
      });
  }

}
