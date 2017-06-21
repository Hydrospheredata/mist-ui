import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Endpoint } from '../models/endpoint';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EndpointDataService {
  endpoints: Observable<Endpoint[]>;
  private _endpoints: BehaviorSubject<Endpoint[]>;
  private baseUrl: string;
  private dataStore: { endpoints: Endpoint[] };

  constructor(private http: Http) {
    this.baseUrl = `${environment.host}:${environment.port}/v2/api/endpoints`
    this.dataStore = { endpoints: [] };
    this._endpoints = <BehaviorSubject<Endpoint[]>>new BehaviorSubject([]);
    this.endpoints = this._endpoints.asObservable();
    this.getAll();
  }

  public getAll() {
     this.http.get(this.baseUrl)
              .map((res: Response) => this.extractEndpoints(res))
              .catch(this.handleError)
              .subscribe((data) => {
                this.dataStore.endpoints = data;
                this.updateStore();
              })
  }

  public get(id: string) {
    let apiUrl = this.baseUrl + `/${id}`
    this.http.get(apiUrl)
             .map((res: Response) => this.extractEndpoint(res))
             .catch(this.handleError)
             .subscribe(data => {
               const idx = this.dataStore.endpoints.findIndex((endpoint) => endpoint.name === data.name);
               if (idx === -1) {
                 this.dataStore.endpoints.push(data);
               } else {
                 this.dataStore.endpoints[idx] = data;
               }
               this.updateStore();
             })
  }

  private updateStore() {
    this._endpoints.next(Object.assign({}, this.dataStore).endpoints);
  }

  private extractEndpoints(res: Response) {
    let data = res.json();
    let endpoints :Endpoint[] = [];
    for(let index in data){
      let job = this.toEndpoint(data[index])
      endpoints.push(job);
    }
    return endpoints
  }

  private extractEndpoint(res: Response) {
    let data = res.json();
    return this.toEndpoint(data)
  }

  private extractData(res: Response) {
    let data = res.json();
    return data || {};
  }

  private toEndpoint(data) {
    let endpoint = new Endpoint({
      name: data['name'],
      lang: data['lang'],
      tags: data['tags'],
      execute: data['execute']
    })
    return endpoint
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
