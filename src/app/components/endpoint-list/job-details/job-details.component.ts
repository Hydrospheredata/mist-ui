import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndpointDataService } from '@services/endpoint-data.service';
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
  endpoint: Endpoint;
  job: Job;
  codeMirrorOptions: {};

  private sub: any;

  constructor(
    private dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private endpointDataService: EndpointDataService,
    private jobStore: JobStore
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params
      .subscribe((params) => { 
      	this.loadInitialData(params['endpointId'], params['jobId'])
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

  loadInitialData(endpointId, jobId) {
    this.endpointDataService.get(endpointId);
    this.endpointDataService.endpoints.subscribe(data => {
      let endpoint = data.find(item => item.name === endpointId);
      this.endpoint = endpoint;
    })
    this.jobStore.get(jobId);
    this.jobStore.jobs.subscribe(data => { 
      let job = data.find(item => item.jobId === jobId);
      this.job = job;
    });
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
