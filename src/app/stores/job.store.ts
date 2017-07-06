import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Job } from '@models/job';
import { HttpJobService } from '@services/http-job.service';

@Injectable()
export class JobStore {
  jobs: Observable<Job[]>;
  runningJobs: Observable<Job[]>
  private _selectedJobs: BehaviorSubject<Job[]>;
  private _runningJobs: BehaviorSubject<Job[]>;
  private dataStore: {
    endpoint: string,
    selectedJobs: Job[],
    runningJobs: Job[]
  };

  constructor(private backendService: HttpJobService) {
    this.dataStore = { endpoint: null, selectedJobs: [], runningJobs: [] };
    this._selectedJobs = <BehaviorSubject<Job[]>>new BehaviorSubject([]);
    this._runningJobs = <BehaviorSubject<Job[]>>new BehaviorSubject([]);
    this.jobs = this._selectedJobs.asObservable();
    this.runningJobs = this._runningJobs.asObservable();
  }

  public add(endpointId: string, args: string = '{}'): void {
    this.backendService.create(endpointId, args).subscribe((data) => {
      this.get(data.id)
    });
  }

  public getAll(): void {
    this.backendService.getAll().subscribe((jobs) => {
      this.dataStore.selectedJobs = jobs;
      this.dataStore.endpoint = null;
      this.updateStore();
    });
  }

  public getAllRunning(): void {
    this.backendService.where({status: ['initialized', 'started', 'queued']}).subscribe((jobs) => {
      this.dataStore.runningJobs = jobs;
      this.updateStore('runningJobs');
    });
  }

  public getByEndpoint(endpointId: string) {
    this.backendService.getByEndpoint(endpointId).subscribe((jobs) => {
      this.dataStore.selectedJobs = jobs;
      this.updateStore();
    });
  }

  public get(id: string): void {
    let obs = this.backendService.get(id)
    obs.subscribe((job) => {
      this.updateItem(job);
      this.updateItem(job, 'runningJobs');
      this.updateStore();
      this.updateStore('runningJobs');
    });
  }

  public kill(id: string): void {
    let obs = this.backendService.kill(id)
    obs.subscribe((job) => {
      this.updateItem(job);
      this.removeItem(job, 'runningJobs');
      this.updateStore();
      this.updateStore('runningJobs');
    })
  }

  // private

  // mode: 'selectedJobs' | 'runningJobs'
  private updateStore(mode: string = 'selectedJobs'): void {
    this[`_${mode}`].next(this.dataStore[mode]);
  }

  // mode: 'selectedJobs' | 'runningJobs'
  private updateItem(job: Job, mode: string = 'selectedJobs') {
    const idx = this.dataStore[mode].findIndex((item) => item.jobId === job.jobId);
    if (idx === -1) {
      this.dataStore[mode].push(job);
    } else {
      this.dataStore[mode][idx] = job;
    }
  }

  // mode: 'selectedJobs' | 'runningJobs'
  private removeItem(job: Job, mode: string = 'selectedJobs') {
    let removedJob = this.dataStore[mode].find(rmvdJob => rmvdJob.jobId === job.jobId);
    let index: number = this.dataStore[mode].indexOf(removedJob);
    this.dataStore[mode].splice(index, 1);
    this.updateStore(mode);
  }
}
