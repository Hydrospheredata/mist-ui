import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Job } from '@models/job';
import { HttpJobService } from '@services/http-job.service';
import { WebSocketJobService } from '@services/web-socket-job.service'

@Injectable()
export class JobStore {
  jobs: Observable<Job[]>;
  runningJobs: Observable<Job[]>;
  private _selectedJobs: BehaviorSubject<Job[]>;
  private _runningJobs: BehaviorSubject<Job[]>;
  private dataStore: {
    endpoint: string,
    selectedJobs: Job[],
    runningJobs: Job[]
  };

  constructor(private backendService: HttpJobService, private wsService: WebSocketJobService) {
    this.dataStore = { endpoint: null, selectedJobs: [], runningJobs: [] };
    this._selectedJobs = <BehaviorSubject<Job[]>>new BehaviorSubject([]);
    this._runningJobs = <BehaviorSubject<Job[]>>new BehaviorSubject([]);
    this.jobs = this._selectedJobs.asObservable();
    this.runningJobs = this._runningJobs.asObservable();
    this.wsConnect();
  }

  public add(endpointId: string, args: string = '{}'): Observable<string> {
    return this.backendService.create(endpointId, args).map((data) => {
      this.get(data.id);
      return data.id
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
      this.dataStore.endpoint = endpointId;
      this.updateStore();
    });
  }

  public get(id: string): void {
    let obs = this.backendService.get(id)
    obs.subscribe((job) => {
      if (!this.dataStore.endpoint || this.dataStore.endpoint === job.endpoint) {
        this.updateItem(job);
      }
      if (job.isRunning()) {
        this.updateItem(job, 'runningJobs');
      } else {
        this.removeItem(job, 'runningJobs');
      }
    });
  }

  public kill(id: string): void {
    let obs = this.backendService.kill(id);
    obs.subscribe((job) => {
      this.updateItem(job);
      this.removeItem(job, 'runningJobs');
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
    this.updateStore(mode);
  }

  // mode: 'selectedJobs' | 'runningJobs'
  private removeItem(job: Job, mode: string = 'selectedJobs') {
    let removedJob = this.dataStore[mode].find(rmvdJob => rmvdJob.jobId === job.jobId);
    if(!removedJob) return false;
    let index: number = this.dataStore[mode].indexOf(removedJob);
    this.dataStore[mode].splice(index, 1);
    this.updateStore(mode);
  }

  private wsConnect() {
    this.wsService.connect().subscribe((message) => {
      this.wsEventHandler(message);
    })
  }

  private wsEventHandler(message) {
    let data = JSON.parse(message.data);
    let events = this.wsService.getEvents();
    if (events.includes(data.event)) {
      this.get(data.id)
    }
  }


  /**
   Updates real time create/end/start time "ago"
   */
  updateTime() {
    return setInterval(() => {
      if (!this.dataStore.selectedJobs.length) {
        return;
      }

      for (let i = 0; i < this.dataStore.selectedJobs.length; i++) {
        this.dataStore.selectedJobs[i].createTime++;
        this.dataStore.selectedJobs[i].startTime++;
        this.dataStore.selectedJobs[i].endTime++;

        setTimeout(() => {
          this.dataStore.selectedJobs[i].endTime--;
          this.dataStore.selectedJobs[i].startTime--;
          this.dataStore.selectedJobs[i].createTime--;
        }, 60 * 1000);
      }

    }, 60 * 2 * 1000)
  }

}
