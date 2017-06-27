import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import '@node_modules/codemirror/mode/javascript/javascript.js';
import '@node_modules/codemirror/addon/edit/matchbrackets';
import '@node_modules/codemirror/addon/edit/closebrackets';
import '@node_modules/codemirror/addon/display/placeholder';


@Component({
  selector: 'dialog-full-screen-json',
  templateUrl: './dialog-full-screen-json.component.html',
  styleUrls: ['./dialog-full-screen-json.component.scss']
})
export class DialogFullScreenJsonComponent implements OnInit {
	jsonString: string;
	codeMirrorOptions: {};

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.jsonString = this.data.jsonString;
    this.codeMirrorOptions = {
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true,
      readOnly: true,
      scrollbarStyle: 'null'
    }

  }

}
