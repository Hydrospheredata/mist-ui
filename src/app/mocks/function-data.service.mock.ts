import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import {FunctionInfo} from '@models/function';
import {mockFunctionList, mockFunction} from './function.mock'

export class MockFunctionDataService {
  functions: Observable<FunctionInfo[]>;
  private _functions: BehaviorSubject<FunctionInfo[]>;
  private dataStore: { functions: FunctionInfo[] };

  constructor() {
    this.dataStore = {functions: []};
    this._functions = <BehaviorSubject<FunctionInfo[]>>new BehaviorSubject([]);
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
