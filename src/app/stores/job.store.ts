import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Job } from '@models/job';
import { HttpJobService } from '@services/http-job.service';

@Injectable()
export class JobStore {
  jobs: Observable<Job[]>;
  private _jobs: BehaviorSubject<Job[]>;
  private dataStore: Job[];

  constructor(private backendService: HttpJobService) {
    this.dataStore = [];
    this._jobs = <BehaviorSubject<Job[]>>new BehaviorSubject([]);
    this.jobs = this._jobs.asObservable();
  }

  public add(endpointId: string, args: string): void {
    this.backendService.create(endpointId, args).subscribe((data) => {
      this.get(data.id)
    });
  }

  public getAll(): void {
    this.backendService.getAll().subscribe((jobs) => {
      this.dataStore = jobs;
      this.updateStore();
    });
  }

  public getByEndpoint(endpointId: string) {
    this.backendService.getByEndpoint(endpointId).subscribe((jobs) => {
      this.dataStore = jobs;
      this.updateStore();
    });
  }

  public get(id: string): void {
    this.backendService.get(id).subscribe((job) => {
      this.updateItem(job)
      this.updateStore();
    });
  }

  public kill(id: string): void {
    let obs = this.backendService.kill(id)
    obs.subscribe((data) => {
               let job = this.dataStore.find(job => job.jobId === data.jobId);
               let index: number = this.dataStore.indexOf(job);
               this.dataStore.splice(index, 1, data);
               this.updateStore();
             })
  }

  private updateStore(): void {
    this._jobs.next(this.dataStore);
  }

  private updateItem(job: Job) {
    const idx = this.dataStore.findIndex((item) => item.jobId === job.jobId);
    if (idx === -1) {
      this.dataStore.push(job);
    } else {
      this.dataStore[idx] = job;
    }
  }

}
