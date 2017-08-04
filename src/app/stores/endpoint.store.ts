import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Endpoint } from '@models/endpoint';
import { HttpEndpointService } from '@services/http-endpoint.service';

@Injectable()
export class EndpointStore {
  endpoints: Observable<Endpoint[]>;
  private _endpoints: BehaviorSubject<Endpoint[]>;
  private dataStore: Endpoint[];

  constructor(private backendService: HttpEndpointService) {
    this.dataStore = [];
    this._endpoints = <BehaviorSubject<Endpoint[]>>new BehaviorSubject([]);
    this.endpoints = this._endpoints.asObservable();
  }

  public getAll(): void {
    this.backendService.getAll().subscribe((endpoints) => {
      this.dataStore = endpoints;
      this.updateStore();
    });
  }

  public get(id: string): void {
    this.backendService.get(id).subscribe((endpoint) => {
      this.updateItem(endpoint);
      this.updateStore();
    });
  }

  private updateStore(): void {
    this._endpoints.next(this.dataStore);
  }

  private updateItem(endpoint: Endpoint) {
    const idx = this.dataStore.findIndex((item) => item.name === endpoint.name);
    if (idx === -1) {
      this.dataStore.push(endpoint);
    } else {
      this.dataStore[idx] = endpoint;
    }
  }

  public createEndpoint(endpoint: Endpoint) {
    const self = this;

    return this.backendService.createEndpoint(endpoint)
      .map((_endpoint) => {
        self.dataStore.push(_endpoint);
        self.updateStore();
        return _endpoint;
      }).catch(err => {
          return Observable.throw(err);
        }
      );

  }

  public updateEndpoint(endpoint: Endpoint) {
    const self = this;
    return this.backendService.updateEndpoint(endpoint)
      .map((_endpoint) => {
        self.updateItem(_endpoint);
        self.updateStore();
        return _endpoint;
      }).catch(err => {
          return Observable.throw(err);
        }
      );

  }

}
