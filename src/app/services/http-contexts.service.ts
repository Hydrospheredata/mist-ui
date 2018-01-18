import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Context } from '@models/context';
import {Observable} from 'rxjs/Observable';
import {HttpService} from './http.service/http.service';

@Injectable()
export class HttpContextsService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `/contexts`;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      let body;
      try {
        body = error.json();
      } catch (e) {
        body = error.text();
      }

      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
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
    return this.http.post(this.baseUrl, JSON.stringify(context))
      .map((response) => response.json())
      .catch(this.handleError);
  }

}
