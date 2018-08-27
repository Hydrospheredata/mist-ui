import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpWorkersService } from '@app/modules/core/services/http-workers.service';
import { Job, Worker } from '@app/modules/shared/models';

@Injectable()
export class WorkersStore {
  workers: Observable<Worker[]>;
  _workers: BehaviorSubject<Worker[]>;
  private dataStore: Worker[];

  constructor(
    private backendService: HttpWorkersService
  ) {
    this.dataStore = [];
    this._workers = <BehaviorSubject<Worker[]>>new BehaviorSubject([]);
    this.workers = this._workers.asObservable();
  }

  getAll() {
    this.backendService.getAll()
      .subscribe((contexts) => {
        this.dataStore = contexts;
        this.updateStore();
      });
  }

  get(name: string) {
    return this.backendService.get(name)
      .map((worker) => {
        for (let i = 0; i < worker.jobs.length; i++) {
          worker.jobs[i] = new Job(worker.jobs[i]);
        }
        return worker;
      });

  }

  updateStore() {
    this._workers.next(this.dataStore);
  }

  private updateItem(worker: Worker) {
    const idx = this.dataStore.findIndex((item) => item.name === worker.name);
    if (idx === -1) {
      this.dataStore.push(worker);
    } else {
      this.dataStore[idx] = worker;
    }
  }

  delete(worker) {
    return this.backendService.delete(worker)
      .subscribe((removedWorker) => {
        this.removeItem(worker);
      });
  }

  private removeItem(worker: Worker) {
    const removedWorker = this.dataStore.find(rmvdWorker => rmvdWorker.name === worker.name);
    if (!removedWorker) {
      return false;
    }
    const index: number = this.dataStore.indexOf(removedWorker);
    this.dataStore.splice(index, 1);
    this.updateStore();
  }

}
