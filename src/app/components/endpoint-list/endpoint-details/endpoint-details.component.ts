import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDataService } from '../../../services/job-data.service'
import { EndpointDataService } from '../../../services/endpoint-data.service'
import { Job } from '../../../models/job'
import { Endpoint } from '../../../models/endpoint'

@Component({
  selector: 'endpoint-details',
  templateUrl: './endpoint-details.component.html',
  styleUrls: ['./endpoint-details.component.css']
})
export class EndpointDetailsComponent implements OnInit {
  endpoint: Endpoint;
  jobs: Job[]=[];

  private sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private endpointDataService: EndpointDataService,
    private jobDataService: JobDataService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params
      .map(params => params['endpointId'])
      .subscribe((id) =>
        {
          this.endpointDataService.get(id).subscribe(endpoint => this.endpoint = endpoint);
          this.jobDataService.getAllByEndpointId(id).subscribe(jobs => this.jobs = jobs);
        });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
