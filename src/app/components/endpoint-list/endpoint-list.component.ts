import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EndpointStore } from '@stores/endpoint.store';
import { Endpoint } from '@models/endpoint';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { DialogAddEndpointComponent } from '@app/components/dialog-add-endpoint/dialog-add-endpoint.component';

@Component({
  selector: 'endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss']
})
export class EndpointListComponent implements OnInit {
  endpoints: Endpoint[];
  searchQ: string;

  constructor(
    private endpointStore: EndpointStore,
    private router: Router,
    public dialog: MdDialog
  ) { }

  openDialogAddEndpointForm() {
    let dialogRef:MdDialogRef<DialogAddEndpointComponent> = this.dialog.open(DialogAddEndpointComponent, {
      width: '900px' ,
      data: {
        selectedEndpoint: {},
      }
    });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.endpointStore.getAll();
    this.endpointStore.endpoints.subscribe(data => { this.endpoints = data });
  }
}
