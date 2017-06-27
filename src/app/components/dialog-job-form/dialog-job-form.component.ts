import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { Endpoint } from '@models/endpoint';
import { EndpointDataService } from '@services/endpoint-data.service'
import { JobDataService } from '@services/job-data.service'

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';

@Component({
  selector: 'dialog-job-form',
  templateUrl: './dialog-job-form.component.html',
  styleUrls: ['./dialog-job-form.component.scss']
})

export class DialogJobFormComponent implements OnInit {
  endpoints: Endpoint[];
  selectedEndpoint: Endpoint;
  codeMirrorOptions: {};
  executeParams: string;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private endpointDataService: EndpointDataService,
    private jobDataService: JobDataService
  ) {}

  ngOnInit() {
    this.selectedEndpoint = this.data.selectedEndpoint;
    this.endpointDataService.endpoints.subscribe(data => { this.endpoints = data });
    this.executeParams = this.selectedEndpoint.executeExample();
    this.codeMirrorOptions = {
      placeholder: 'Parameters...',
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true
    }
  }

  onChangeEndpoint() {
    this.executeParams = this.selectedEndpoint.executeExample();
  }

  submit() {
    let endpointId = this.selectedEndpoint.name
    let params = this.executeParams
    this.jobDataService.create(endpointId, params)
  }
}
