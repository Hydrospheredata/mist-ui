import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { Endpoint } from '@models/endpoint';
import { mockEndpointsList, mockEndpoint } from './endpoint.mock'

export class MockEndpointDataService {
	endpoints: Observable<Endpoint[]>;
  private _endpoints: BehaviorSubject<Endpoint[]>;
  private dataStore: { endpoints: Endpoint[] };

  constructor() {
    this.dataStore = { endpoints: [] };
    this._endpoints = <BehaviorSubject<Endpoint[]>>new BehaviorSubject([]);
    this.endpoints = this._endpoints.asObservable();
    this.getAll();
  }

  public getAll() {
  	this.dataStore.endpoints = mockEndpointsList;
  	this._endpoints.next(Object.assign({}, this.dataStore).endpoints);
  }
  public get(id: string) {
    this.dataStore.endpoints = mockEndpointsList;
    this._endpoints.next(Object.assign({}, this.dataStore).endpoints);
  }
}
