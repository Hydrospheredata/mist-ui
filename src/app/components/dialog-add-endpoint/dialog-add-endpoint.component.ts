import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-endpoint',
  templateUrl: './dialog-add-endpoint.component.html',
  styleUrls: ['./dialog-add-endpoint.component.scss']
})
export class DialogAddEndpointComponent implements OnInit {
  public endpointForm: FormGroup;
  // public name: string;
  // public path: string;
  // public className: string;
  // public nameSpace: string;

  constructor(public dialogRef: MdDialogRef<DialogAddEndpointComponent>) {

  }

  ngOnInit() {
    this.endpointForm = new FormGroup({
      name: new FormControl(),
      nameSpace: new FormControl(),
      path: new FormControl(),
      className: new FormControl()
    });
  }

}
