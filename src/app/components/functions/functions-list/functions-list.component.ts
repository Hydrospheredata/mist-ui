import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EndpointStore } from '@stores/endpoint.store';
import { JobStore } from '@stores/job.store';
import { Endpoint } from '@models/endpoint';
import { Job } from '@models/job';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogEndpointFormComponent, injectableEndpoint } from '@app/components/dialogs/dialog-endpoint-form/dialog-endpoint-form.component';

@Component({
  selector: 'mist-functions-list',
  templateUrl: './functions-list.component.html',
  styleUrls: ['./functions-list.component.scss']
})
export class FunctionsListComponent implements OnInit, OnDestroy {
  endpoints: Endpoint[];
  runningJobs: Job[];
  searchQ: string;
  private endpointStoreSub;
  private jobStoreSub;
  public activeEndpoint: string;


  constructor(
    private endpointStore: EndpointStore,
    private jobStore: JobStore,
    private router: Router,
    public dialog: MdlDialogService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loadInitialData();
    this.router.events.subscribe((params) => {
      if (params && params['url']) {
        this.activeEndpoint = params['url'].split(/\//);
        this.activeEndpoint = this.activeEndpoint[this.activeEndpoint.length - 1];
      }
    });

  }

  ngOnDestroy() {
    if (this.endpointStoreSub) {
      this.endpointStoreSub.unsubscribe();
    }
    if (this.jobStoreSub) {
      this.jobStoreSub.unsubscribe();
    }
  }

  openDialogEndpointForm(endpoint = null) {
    this.dialog.showCustomDialog({
      component: DialogEndpointFormComponent,
      isModal: true,
      styles: {'width': '850px', 'max-height': '100%'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableEndpoint, useValue: endpoint}]
    });
  }

  loadInitialData() {
    this.endpointStore.getAll();
    this.endpointStore.endpoints.subscribe((data) => { this.endpoints = data; });
    this.jobStore.getAllRunning();
    this.jobStore.runningJobs.subscribe((jobs) => {
      this.runningJobs = jobs;
    })
  }

  runningJobsCountBy(endpointId: string): Number {
    let result = this.runningJobs.filter((job) => { return job.endpoint === endpointId });
    return result.length
  }

}
