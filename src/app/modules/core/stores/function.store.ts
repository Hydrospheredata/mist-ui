import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Function } from '@app/modules/shared/models';
import { HttpFunctionService } from '@app/modules/core/services/http-function.service';

@Injectable()
export class FunctionStore {
  functions: Observable<Function[]>;
  private _functions: BehaviorSubject<Function[]>;
  private dataStore: Function[];

  constructor(private backendService: HttpFunctionService) {
    this.dataStore = [];
    this._functions = <BehaviorSubject<Function[]>>new BehaviorSubject([]);
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

  private updateItem(functionInfo: Function) {
    const idx = this.dataStore.findIndex((item) => item.name === functionInfo.name);
    if (idx === -1) {
      this.dataStore.push(functionInfo);
    } else {
      this.dataStore[idx] = functionInfo;
    }
  }

  public createFunction(functionInfo: Function) {
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

  public updateFunction(functionInfo: Function) {
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
