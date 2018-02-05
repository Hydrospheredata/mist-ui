import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { FunctionInfo } from '@models/function';
import { HttpFunctionService } from '@services/http-function.service';

@Injectable()
export class FunctionStore {
  functions: Observable<FunctionInfo[]>;
  private _functions: BehaviorSubject<FunctionInfo[]>;
  private dataStore: FunctionInfo[];

  constructor(private backendService: HttpFunctionService) {
    this.dataStore = [];
    this._functions = <BehaviorSubject<FunctionInfo[]>>new BehaviorSubject([]);
    this.functions = this._functions.asObservable();
  }

  public getAll(): void {
    this.backendService.getAll().subscribe((functions) => {
      this.dataStore = functions;
      this.updateStore();
    });
  }

  public get(id: string): void {
    this.backendService.get(id).subscribe((functionInfo) => {
      this.updateItem(functionInfo);
      this.updateStore();
    });
  }

  private updateStore(): void {
    this._functions.next(this.dataStore);
  }

  private updateItem(functionInfo: FunctionInfo) {
    const idx = this.dataStore.findIndex((item) => item.name === functionInfo.name);
    if (idx === -1) {
      this.dataStore.push(functionInfo);
    } else {
      this.dataStore[idx] = functionInfo;
    }
  }

  public createFunction(functionInfo: FunctionInfo) {
    const self = this;

    return this.backendService.createFunction(functionInfo)
      .map((_function) => {
        self.dataStore.push(_function);
        self.updateStore();
        return _function;
      }).catch(err => {
          return Observable.throw(err);
        }
      );

  }

  public updateFunction(functionInfo: FunctionInfo) {
    const self = this;
    return this.backendService.updateFunction(functionInfo)
      .map((_function) => {
        self.updateItem(_function);
        self.updateStore();
        return _function;
      }).catch(err => {
          return Observable.throw(err);
        }
      );

  }


}
