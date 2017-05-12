import { Component, OnInit } from '@angular/core';
import { JobEndpointsDataService } from '../../services/job-endpoints-data.service';
import { JobEndpoint } from '../../models/job-endpoint'

@Component({
  selector: 'job-endpoints-list',
  templateUrl: './job-endpoints-list.component.html',
  styleUrls: ['./job-endpoints-list.component.css'],
  providers: [JobEndpointsDataService]
})
export class JobEndpointsListComponent implements OnInit {
  errorMessage: string;
  jobEdnpoints: JobEndpoint[]=[];

  constructor(private jobEndpointsDataService: JobEndpointsDataService) { }

  ngOnInit() {
    this.getJobEndpoints();
  }

  getJobEndpoints(): void {
    this.jobEndpointsDataService.getAll()
                                .subscribe(
                                  endpoints => this.jobEdnpoints=endpoints,
                                  error => this.errorMessage = <any>error);
  }

}
