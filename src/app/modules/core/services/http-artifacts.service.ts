import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '@app/modules/core/services/http.service/http.service';

@Injectable()
export class HttpArtifactsService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `/artifacts`;
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

  public getArtifact(id?: string) {
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
  // TODO: proper upload
  public uploadArtifact(context: any) {
    return this.http.post(this.baseUrl, JSON.stringify(context))
      .map((response) => response.json())
      .catch(this.handleError);
  }

}
