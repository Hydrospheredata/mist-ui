import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DialogJobFormComponent } from '@components/dialog-job-form/dialog-job-form.component';
import { EndpointDataService } from '@services/endpoint-data.service';
import { JobDataService } from '@services/job-data.service';
import { Job } from '@models/job';
import { Endpoint } from '@models/endpoint';

@Component({
  selector: 'endpoint-details',
  templateUrl: './endpoint-details.component.html',
  styleUrls: ['./endpoint-details.component.scss']
})
export class EndpointDetailsComponent implements OnInit {
  endpoint: Endpoint;
  jobs: Job[];
  namespace: string;
  statusFilter: object = {
    success: true,
    running: true,
    failed: false
  };

  private sub: any;

  constructor(
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private endpointDataService: EndpointDataService,
    private jobDataService: JobDataService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params
      .map(params => params['endpointId'])
      .subscribe((id) => { this.loadInitialData(id) });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadInitialData(id: string) {
    this.endpointDataService.endpoints.subscribe(data => {
      let endpoint = data.find(item => item.name === id);
      this.endpoint = endpoint;
    })
    this.jobDataService.getAllByEndpointId(id);
    this.jobDataService.jobs.subscribe(data => { this.jobs = data });
    this.namespace = 'Namespace1'
  }

  openDialogJobForm() {
    this.dialog.open(DialogJobFormComponent, {
      width: '900px' ,
      data: {
        selectedEndpoint: this.endpoint,
      }
    });
  }

  killJob(event, job: Job) {
    event.preventDefault();
    this.jobDataService.delete(job.jobId)
  }

  toggleStatusFilter(option) {
    this.statusFilter[option] = !this.statusFilter[option]
  }

  selectNamespace(event, namespace) {
    event.preventDefault();
    this.namespace = namespace;
  }

}
