import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobStore } from '@stores/job.store';
import { MdlDialogService } from '@angular-mdl/core';
import {
  DialogFullScreenJsonComponent,
  injectableJsonString
} from '@components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';
import { DialogCloneJobFormComponent, injectableJob } from '@components/dialogs/dialog-clone-job-form/dialog-clone-job-form.component';
import { Job } from '@models/job';
import { WorkersStore } from '@stores/workers.store';
import { Workers } from '@models/workers';
import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

import * as moment from 'moment';


@Component({
  selector: 'mist-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  @Input() jobDetails;

  job: Job;
  codeMirrorOptions: {};
  public jobArguments: string;
  private activatedRouteSub: any;
  private jobStoreSub: any;
  private jobWorkerSub: any;
  public worker: Worker[];
  private timeUpdaterLink;

  public jobCreateTime: string;
  public jobStartTime: string;
  public jobEndTime: string;
  public jobCreateTimeDuration: string;
  public jobStartTimeDuration: string;

  constructor(
    private dialog: MdlDialogService,
    private activatedRoute: ActivatedRoute,
    private jobStore: JobStore,
    private workersStore: WorkersStore
  ) { }

  ngOnInit() {
    if (this.jobDetails) {
      this.job = this.jobDetails;
    } else {
      this.activatedRouteSub = this.activatedRoute.params
        .subscribe((params) => {
          this.loadInitialData(params['jobId']);
        });
    }
    this.codeMirrorOptions = {
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true,
      readOnly: true,
      scrollbarStyle: 'null',
      smartIndent: true
    }
  }

  ngOnDestroy() {
    if (this.activatedRouteSub) {
      this.activatedRouteSub.unsubscribe();
    }
    if (this.jobStoreSub) {
      this.jobStoreSub.unsubscribe();
    }
    if (this.timeUpdaterLink) {
      clearInterval(this.timeUpdaterLink);
    }
    if (this.jobWorkerSub) {
      this.jobWorkerSub.unsubscribe();
    }
  }

  loadInitialData(jobId) {
    this.jobStore.get(jobId);
    this.jobStore.getJobsWorker(jobId);
    this.jobStoreSub = this.jobStore.jobs
      .subscribe((data: Job[]) => {
        let job = data.find(item => item.jobId === jobId);
        this.job = job;

        if (this.job) {
          if (this.job.createTime) {
            this.jobCreateTime = this.setDate(this.job.createTime);
            this.jobCreateTimeDuration = this.setDuration(this.job.endTime, this.job.createTime);
          }
          if (this.job.startTime) {
            this.jobStartTime = this.setDate(this.job.startTime);
            this.jobCreateTimeDuration = this.setDuration(this.job.startTime, this.job.createTime);
            this.jobStartTimeDuration = this.setDuration(this.job.endTime, this.job.startTime);
          }
          if (this.job.endTime) {
            this.jobEndTime = this.setDate(this.job.endTime);
          }
          this.timeUpdaterLink = this.jobStore.updateTime();
          this.jobArguments = JSON.stringify(JSON.parse(job.params).arguments, null, 2);
        }
      });

    this.jobWorkerSub = this.jobStore.worker
      .subscribe(worker => {
        if (worker) {
          this.worker = worker;
        }
      });
  }

  openDialogJobForm() {
    const dialog = this.dialog.showCustomDialog({
      component: DialogCloneJobFormComponent,
      styles: { 'max-width': '900px', 'width': '850px' },
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{ provide: injectableJob, useValue: this.job }],
    });
  }

  openFullScreenJson(jsonString: string) {
    if (typeof jsonString === 'object') {
      jsonString = JSON.stringify(jsonString);
    }
    this.dialog.showCustomDialog({
      component: DialogFullScreenJsonComponent,
      styles: { 'width': '100%', 'height': '100%' },
      providers: [{ provide: injectableJsonString, useValue: jsonString }],
    });
  }

  private setDate(timestamp: number) {
    return moment(timestamp).format('MMM Do, kk:mm:ss.SSSS');
  }

  private setDuration(then: number, now: number) {
    return moment(moment.duration(moment(then).diff(moment(now))).asMilliseconds()).format('mm:ss.SSSS');
  }

}
