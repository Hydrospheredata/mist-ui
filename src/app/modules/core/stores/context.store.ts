import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Context } from '@shared/models';
import { HttpContextsService } from '@app/modules/core/services/http-contexts.service';

@Injectable()
export class ContextStore {
  contexts: Observable<Context[]>;
  _contexts: BehaviorSubject<Context[]>;
  private dataStore: Context[];

  constructor(
    private backendService: HttpContextsService
  ) {
    this.dataStore = [];
    this._contexts = <BehaviorSubject<Context[]>>new BehaviorSubject([]);
    this.contexts = this._contexts.asObservable();
  }

  getAll() {
    this.backendService.getContext()
      .subscribe((contexts) => {
        this.dataStore = contexts;
        this.updateStore();
      });
  }

  get(id: string): Observable<Context> {
    return this.backendService.getContext(id)
      .map((contexts) => {
        this.updateItem(contexts);
        this.updateStore();
        return contexts;
      });
  }

  updateStore() {
    this._contexts.next(this.dataStore);
  }

  private updateItem(context: Context) {
    const idx = this.dataStore.findIndex((item) => item.name === context.name);
    if (idx === -1) {
      this.dataStore.push(context);
    } else {
      this.dataStore[idx] = context;
    }
  }

  createContext(context: Context) {
    const self = this;
    return this.backendService.createContext(context)
      .map(_context => {
        self.dataStore.push(_context);
        self.updateStore();
        return _context;
      })
      .catch(err => {
        return Observable.throw(err);
      }
      );
  }

}
