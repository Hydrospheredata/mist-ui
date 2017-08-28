import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Endpoint} from '@models/endpoint';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from '@services/http.service';

@Injectable()
export class HttpEndpointService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `/endpoints`;
  }

  public getAll(): Observable<Endpoint[]> {
    return this.http.get(this.baseUrl)
      .map((res: Response) => this.extractEndpoints(res))
      .catch(this.handleError);
  }

  public get(id: string): Observable<Endpoint> {
    let apiUrl = this.baseUrl + `/${id}`;
    return this.http.get(apiUrl)
      .map((res: Response) => this.extractEndpoint(res))
      .catch(this.handleError);
  }

  private extractEndpoints(res: Response) {
    let data = res.json();
    let endpoints: Endpoint[] = [];
    for (let index in data) {
      let job = this.toEndpoint(data[index]);
      endpoints.push(job);
    }
    return endpoints;
  }

  private extractEndpoint(res: Response) {
    let data;
    try {
      data = res.json();
    } catch (e) {
      return Observable.throw(e)
    } finally {
      if (data) {
        return this.toEndpoint(data);
      }
    }
  }

  private extractData(res: Response) {
    let data = res.json();
    return data || {};
  }

  private toEndpoint(data) {
    const endpoint = new Endpoint({
      name: data['name'],
      lang: data['lang'],
      tags: data['tags'],
      defaultContext: data['defaultContext'],
      path: data['path'],
      execute: data['execute'],
      className: data['className'],
      contextSettings: data['contextSettings'],
      endpointStore: data['endpointStore'],
    });
    return endpoint;
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

  public createEndpoint(endpoint: Endpoint) {
    const _endpoint: string = JSON.stringify(endpoint);

    return this.http.post(this.baseUrl, _endpoint)
      .map(this.extractEndpoint.bind(this))
      .catch(this.handleError);
  }

  public updateEndpoint(endpoint: Endpoint) {
    const _endpoint: string = JSON.stringify(endpoint);

    return this.http.put(this.baseUrl, _endpoint)
      .map(this.extractEndpoint.bind(this))
      .catch(this.handleError);
  }

}
