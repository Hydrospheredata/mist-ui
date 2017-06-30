import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EndpointDataService } from '@services/endpoint-data.service';
import { Endpoint } from '@models/endpoint';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import { DialogAddEndpointComponent } from '@app/components/dialog-add-endpoint/dialog-add-endpoint.component';

@Component({
  selector: 'endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss']
})
export class EndpointListComponent implements OnInit {
  endpoints: Endpoint[]

  constructor(
    private endpointDataService: EndpointDataService,
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
    this.endpointDataService.getAll();
    this.endpointDataService.endpoints.subscribe(data => { this.endpoints = data });
  }
}
