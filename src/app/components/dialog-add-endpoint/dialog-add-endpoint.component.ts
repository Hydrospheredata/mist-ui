import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mist-dialog-add-endpoint',
  templateUrl: './dialog-add-endpoint.component.html',
  styleUrls: ['./dialog-add-endpoint.component.scss']
})
export class DialogAddEndpointComponent implements OnInit {
  public endpointForm: FormGroup;
  private file: File;

  constructor(public dialogRef: MdDialogRef<DialogAddEndpointComponent>) {
  }

  ngOnInit() {
    this.endpointForm = new FormGroup({
      name: new FormControl(),
      nameSpace: new FormControl(),
      path: new FormControl(),
      className: new FormControl(),
      additionalParams: new FormControl(),
      file: new FormControl()
    });
  }

  submit(form) {
    console.log("FORM = ", form );
  }

  onFileChange($event) {
    this.file = $event.target.files[0];
  }

}
