import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DialogJobFormComponent } from '@components/dialog-job-form/dialog-job-form.component';
import { EndpointStore } from '@stores/endpoint.store';
import { JobStore } from '@stores/job.store';
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
  statusFilter: { success: boolean, running: boolean, failed: boolean }

  private sub: any;

  constructor(
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private endpointStore: EndpointStore,
    private jobStore: JobStore
  ) {}

  ngOnInit() {
    this.setFilterOptions();
    this.sub = this.activatedRoute.params
      .map(params => params['endpointId'])
      .subscribe((id) => { this.loadInitialData(id) });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadInitialData(id: string) {
    if (id === 'overview') {
      this.jobStore.getAll();
    } else {
      this.jobStore.getByEndpoint(id);
    }
    this.endpointStore.endpoints.subscribe(data => {
      let endpoint = data.find(item => item.name === id);
      this.endpoint = endpoint;
    })
    this.jobStore.jobs.subscribe((jobs) => {
      this.jobs = jobs;
    })
    this.namespace = 'Namespace1';
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
    this.jobStore.kill(job.jobId)
  }

  toggleStatusFilter(option) {
    this.statusFilter[option] = !this.statusFilter[option]
    this.setFilterOptionsToLocalStorage();
  }

  selectNamespace(event, namespace) {
    event.preventDefault();
    this.namespace = namespace;
  }

  // private

  private setFilterOptions() {
    let options = JSON.parse(localStorage.getItem('jobsStatusFilter'));
    if (options) {
      this.statusFilter = options;
    } else {
      this.statusFilter = { success: true, running: true, failed: false };
      this.setFilterOptionsToLocalStorage()
    }
  }

  private setFilterOptionsToLocalStorage() {
    localStorage.setItem('jobsStatusFilter', JSON.stringify(this.statusFilter));
  }

}
