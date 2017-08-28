import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Workers } from '@models/workers';
import { HttpWorkersService } from '@services/http-workers.service';

@Injectable()
export class WorkersStore {
  workers: Observable<Workers[]>;
  _workers: BehaviorSubject<Workers[]>;
  private dataStore: Workers[];

  constructor(
    private backendService: HttpWorkersService
  ) {
    this.dataStore = [];
    this._workers = <BehaviorSubject<Workers[]>>new BehaviorSubject([]);
    this.workers = this._workers.asObservable();
  }

  getAll() {
    this.backendService.getAll()
      .subscribe((contexts) => {
        this.dataStore = contexts;
        this.updateStore();
      });
  }

  updateStore() {
    this._workers.next(this.dataStore);
  }

  private updateItem(worker: Workers) {
    const idx = this.dataStore.findIndex((item) => item.name === worker.name);
    if (idx === -1) {
      this.dataStore.push(worker);
    } else {
      this.dataStore[idx] = worker;
    }
  }

}
