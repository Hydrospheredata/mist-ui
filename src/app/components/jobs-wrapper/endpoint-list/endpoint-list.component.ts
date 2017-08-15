import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointStore } from '@stores/endpoint.store';
import { JobStore } from '@stores/job.store';
import { Endpoint } from '@models/endpoint';
import { Job } from '@models/job';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogEndpointFormComponent, injectableEndpoint } from '@app/components/dialogs/dialog-endpoint-form/dialog-endpoint-form.component';

@Component({
  selector: 'mist-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss']
})
export class EndpointListComponent implements OnInit, OnDestroy {
  endpoints: Endpoint[];
  runningJobs: Job[];
  searchQ: string;
  private endpointStoreSub;
  private jobStoreSub;


  constructor(
    private endpointStore: EndpointStore,
    private jobStore: JobStore,
    private router: Router,
    public dialog: MdlDialogService
  ) { }

  ngOnInit() {
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.endpointStoreSub.unsubscribe();
    this.jobStoreSub.unsubscribe();
  }

  openDialogAddEndpointForm() {

    this.dialog.showCustomDialog({
      component: DialogEndpointFormComponent,
      isModal: true,
      styles: {'width': '850px', 'max-height': '100%'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableEndpoint, useValue: null}]
    });
  }

  loadInitialData() {
    this.endpointStore.getAll();
    this.endpointStore.endpoints.subscribe((data) => { this.endpoints = data; });
    this.jobStore.getAllRunning();
    this.jobStore.runningJobs.subscribe((jobs) => {
      this.runningJobs = jobs
    })
  }

  runningJobsCountBy(endpointId: string): Number {
    let result = this.runningJobs.filter((job) => { return job.endpoint === endpointId });
    return result.length
  }
}
