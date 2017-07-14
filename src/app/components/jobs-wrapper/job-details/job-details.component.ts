import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobStore } from '@stores/job.store';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DialogFullScreenJsonComponent } from '@components/dialog-full-screen-json/dialog-full-screen-json.component';
import { Job } from '@models/job';
import { Endpoint } from '@models/endpoint';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';


@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  job: Job;
  codeMirrorOptions: {};

  private sub: any;

  constructor(
    private dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jobStore: JobStore
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params
      .subscribe((params) => {
        this.loadInitialData(params['jobId'])
      });

    this.codeMirrorOptions = {
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true,
      readOnly: true,
      scrollbarStyle: 'null'
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadInitialData(jobId) {
    this.jobStore.get(jobId);
    this.jobStore.jobs.subscribe(data => {
      let job = data.find(item => item.jobId === jobId);
      this.job = job;
    });
  }

  cloneJob(job: Job) {
    let params = JSON.parse(job.params)
    let args = JSON.stringify(params.arguments)
    this.jobStore.add(job.endpoint, args).subscribe((id) => {
      this.router.navigate(['/jobs', job.endpoint, id])
    })
  }

  openFullScreenJson(jsonString: string) {
    this.dialog.open(DialogFullScreenJsonComponent, {
      width: '80%',
      data: {
        jsonString: jsonString
      }
    });
  }

}
