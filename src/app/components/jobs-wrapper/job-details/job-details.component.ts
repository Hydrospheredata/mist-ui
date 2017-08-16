import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobStore } from '@stores/job.store';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogFullScreenJsonComponent, injectableJsonString } from '@components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';
import { DialogCloneJobFormComponent, injectableJob } from '@components/dialogs/dialog-clone-job-form/dialog-clone-job-form.component';
import { Job } from '@models/job';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';


@Component({
  selector: 'mist-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  job: Job;
  codeMirrorOptions: {};
  public jobArguments: string;
  private activatedRouteSub: any;
  private jobStoreSub: any;

  constructor(
    private dialog: MdlDialogService,
    private activatedRoute: ActivatedRoute,
    private jobStore: JobStore
  ) { }

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.params
      .subscribe((params) => {
        this.loadInitialData(params['jobId'])
      });

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
    this.activatedRouteSub.unsubscribe();
    this.jobStoreSub.unsubscribe();
  }

  loadInitialData(jobId) {
    this.jobStore.get(jobId);
    this.jobStoreSub = this.jobStore.jobs.subscribe(data => {
      let job = data.find(item => item.jobId === jobId);
      this.job = job;
      if (job) {
        this.jobArguments = JSON.stringify(JSON.parse(job.params).arguments, null, 2);
      }
    });
  }

  openDialogJobForm() {
    let dialog = this.dialog.showCustomDialog({
      component: DialogCloneJobFormComponent,
      styles: {'max-width': '900px', 'width': '850px'},
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableJob, useValue: this.job}],
    });
  }

  openFullScreenJson(jsonString: string) {
    this.dialog.showCustomDialog({
      component: DialogFullScreenJsonComponent,
      styles: { 'width': '100%', 'height': '100%'},
      providers: [{provide: injectableJsonString, useValue: jsonString}],
    });
  }

}
