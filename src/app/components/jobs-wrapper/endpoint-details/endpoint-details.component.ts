import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogJobFormComponent, injectableSelectedEndpoint } from '@components/dialogs/dialog-job-form/dialog-job-form.component';
import { DialogEndpointFormComponent, injectableEndpoint } from '@components/dialogs/dialog-endpoint-form/dialog-endpoint-form.component';
import { EndpointStore } from '@stores/endpoint.store';
import { JobStore } from '@stores/job.store';
import { Job } from '@models/job';
import { Endpoint } from '@models/endpoint';
import { ContextStore } from '@stores/context.store';
import { Context } from '@models/context';

@Component({
  selector: 'mist-endpoint-details',
  templateUrl: './endpoint-details.component.html',
  styleUrls: ['./endpoint-details.component.scss'],
  providers: []
})
export class EndpointDetailsComponent implements OnInit, OnDestroy {
  endpoint: Endpoint;
  jobs: Job[];
  context: string;
  statusFilter: { success: boolean, running: boolean, failed: boolean };
  private activatedRouteSub: any;
  private contextStoreSub;
  public contexts: Context[];
  public currentContext: Context;
  public timeUpdaterLink: any;

  constructor(
    public dialog: MdlDialogService,
    private activatedRoute: ActivatedRoute,
    private endpointStore: EndpointStore,
    private jobStore: JobStore,
    private contextStore: ContextStore,
  ) {
  }

  ngOnInit() {
    this.setFilterOptions();
    this.timeUpdaterLink = this.jobStore.updateTime();

    this.activatedRouteSub = this.activatedRoute.params
      .map((params) => {
        this.currentContext = params['endpointId'];
        return params['endpointId'];
      })
      .subscribe((id) => { this.loadInitialData(id) });

    this.contextStore.getAll();
    this.contextStoreSub = this.contextStore.contexts
      .subscribe((contexts) => this.contexts = contexts)
  }

  ngOnDestroy() {
    this.activatedRouteSub.unsubscribe();
    this.contextStoreSub.unsubscribe();
    if (this.timeUpdaterLink) {
      clearInterval(this.timeUpdaterLink)
    }
  }

  loadInitialData(id: string) {
    if (id === 'overview') {
      this.jobStore.getAll();
    } else {
      this.jobStore.getByEndpoint(id);
    }
    this.endpointStore.endpoints.subscribe(data => {
      const endpoint = data.find(item => item.name === id) || data[0];
      this.endpoint = endpoint;
    });
    this.jobStore.jobs.subscribe((jobs: Job[]) => {
      this.jobs = jobs;
    });
  }

  openDialogJobForm() {
    let dialog = this.dialog.showCustomDialog({
      component: DialogJobFormComponent,
      styles: {'max-width': '900px', 'width': '850px'},
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableSelectedEndpoint, useValue: this.endpoint}],
    });
  }

  killJob(event, job: Job) {
    event.preventDefault();
    event.stopPropagation();
    this.jobStore.kill(job.jobId);
  }

  toggleStatusFilter(option) {
    this.statusFilter[option] = !this.statusFilter[option];
    this.setFilterOptionsToLocalStorage();
  }

  selectContext(event, context) {
    event.preventDefault();
    this.context = context;
  }

  private setFilterOptions() {
    const options = JSON.parse(localStorage.getItem('jobsStatusFilter'));
    if (options) {
      this.statusFilter = options;
    } else {
      this.statusFilter = { success: true, running: true, failed: true };
      this.setFilterOptionsToLocalStorage()
    }
  }

  private setFilterOptionsToLocalStorage() {
    localStorage.setItem('jobsStatusFilter', JSON.stringify(this.statusFilter));
  }

}
