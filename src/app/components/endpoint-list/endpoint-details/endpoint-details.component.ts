import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { EndpointDataService } from '../../../services/endpoint-data.service'
import { JobDataService } from '../../../services/job-data.service'
import { Job } from '../../../models/job'
import { Endpoint } from '../../../models/endpoint'

@Component({
  selector: 'endpoint-details',
  templateUrl: './endpoint-details.component.html',
  styleUrls: ['./endpoint-details.component.scss']
})
export class EndpointDetailsComponent implements OnInit {
  isLoading: boolean;
  endpoint: Observable<Endpoint>;
  jobs: Observable<Job[]>;
  namespace: string;
  statusFilter: object = {
    success: true,
    running: true,
    failed: false
  };

  private sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private endpointDataService: EndpointDataService,
    private jobDataService: JobDataService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.sub = this.activatedRoute.params
      .map(params => params['endpointId'])
      .subscribe(
        (id) => { this.loadInitialData(id) },
        () =>  { this.stopLoading() },
        () => { this.stopLoading() }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadInitialData(id: string) {
    this.endpoint = this.endpointDataService.endpoints
                      .map(items => items.find(item => item.name === id));
    this.jobDataService.getAllByEndpointId(id);
    this.jobs = this.jobDataService.jobs;
    this.namespace = 'Namespace1'
  }

  stopLoading() {
    this.isLoading = false;
  }

  killJob(event, job: Job) {
    event.preventDefault();
    this.jobDataService.delete(job.jobId)
  }

  toggleStatusFilter(option) {
    this.statusFilter[option] = !this.statusFilter[option]
  }

  namespaceSelect(event, namespace) {
    event.preventDefault();
    this.namespace = namespace;
  }

}
