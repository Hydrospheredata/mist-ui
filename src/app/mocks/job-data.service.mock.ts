import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { Job } from '@app/modules/shared/models';
import { mockJobsList, mockJob } from '@app/mocks/job.mock'

export class MockJobDataService {
  jobs: Observable<Job[]>;
  private _jobs: BehaviorSubject<Job[]>;
  private dataStore: { jobs: Job[] };

  constructor() {
    this.dataStore = { jobs: [] };
    this._jobs = <BehaviorSubject<Job[]>>new BehaviorSubject([]);
    this.jobs = this._jobs.asObservable();
  }

  public getAllByFunctionId(id: string) {
    this.dataStore.jobs = mockJobsList;
    this._jobs.next(Object.assign({}, this.dataStore).jobs);
  }

  public get(id: string) {
    this.dataStore.jobs = mockJobsList;
    this._jobs.next(Object.assign({}, this.dataStore).jobs);
  }
}
