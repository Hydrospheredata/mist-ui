import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Endpoint } from '../models/endpoint';
import { mockEndpointsList, mockEndpoint } from './endpoint.mock'

export class MockEndpointsDataService {

  public getAll(): Observable<Endpoint[]> {
    return Observable.of(mockEndpointsList);
  }
}
