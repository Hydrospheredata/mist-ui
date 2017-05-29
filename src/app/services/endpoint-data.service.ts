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
              .map(this.extractData)
              .catch(this.handleError)
              .subscribe((data) => {
                this.dataStore.endpoints = data;
                this._endpoints.next(Object.assign({}, this.dataStore).endpoints);
              })
  }

  public get(id: string) {
    let apiUrl = this.baseUrl + `/${id}`
    this.http.get(apiUrl)
             .map(this.extractData)
             .catch(this.handleError)
             .subscribe(data => {
               let notFound = true;
               this.dataStore.endpoints.forEach((item, index) => {
                 if(item.name === data.name) {
                   this.dataStore.endpoints[index] = data;
                   notFound = false;
                 }
               });
               if (notFound) {
                 this.dataStore.endpoints.push(data);
               }
               this._endpoints.next(Object.assign({}, this.dataStore).endpoints);
             })
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
