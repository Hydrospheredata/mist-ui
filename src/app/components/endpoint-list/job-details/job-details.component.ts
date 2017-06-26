import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndpointDataService } from '../../../services/endpoint-data.service';
import { JobDataService } from '../../../services/job-data.service';
import { Job } from '../../../models/job';
import { Endpoint } from '../../../models/endpoint';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  endpoint: Endpoint;
  job: Job;

  private sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private endpointDataService: EndpointDataService,
    private jobDataService: JobDataService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params
      .subscribe((params) => { 
      	this.loadInitialData(params['endpointId'], params['jobId'])
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadInitialData(endpointId, jobId) {
    this.endpointDataService.get(endpointId);
    this.endpointDataService.endpoints.subscribe(data => {
      let endpoint = data.find(item => item.name === endpointId);
      this.endpoint = endpoint;
    })
    this.jobDataService.get(jobId);
    this.jobDataService.jobs.subscribe(data => { 
      let job = data.find(item => item.jobId === jobId);
      this.job = job;
    });
  } 

}
