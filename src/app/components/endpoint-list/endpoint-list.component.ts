import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EndpointDataService } from '../../services/endpoint-data.service';
import { Endpoint } from '../../models/endpoint'

@Component({
  selector: 'endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss']
})
export class EndpointListComponent implements OnInit {
  endpoints: Endpoint[]

  constructor(
    private endpointDataService: EndpointDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.endpointDataService.getAll();
    this.endpointDataService.endpoints.subscribe(data => { this.endpoints = data });
  }
}
