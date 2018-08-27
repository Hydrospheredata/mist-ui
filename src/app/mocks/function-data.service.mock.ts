import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { Function } from '@app/modules/shared/models';
import { mockFunctionList, mockFunction } from '@app/mocks/function.mock'

export class MockFunctionDataService {
  functions: Observable<Function[]>;
  private _functions: BehaviorSubject<Function[]>;
  private dataStore: { functions: Function[] };

  constructor() {
    this.dataStore = { functions: [] };
    this._functions = <BehaviorSubject<Function[]>>new BehaviorSubject([]);
    this.functions = this._functions.asObservable();
    this.getAll();
  }

  public getAll() {
    this.dataStore.functions = mockFunctionList;
    this._functions.next(Object.assign({}, this.dataStore).functions);
  }

  public get(id: string) {
    this.dataStore.functions = mockFunctionList;
    this._functions.next(Object.assign({}, this.dataStore).functions);
  }
}
