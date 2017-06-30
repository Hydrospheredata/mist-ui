import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EndpointStore } from '@stores/endpoint.store';
import { Endpoint } from '@models/endpoint'

@Component({
  selector: 'endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss']
})
export class EndpointListComponent implements OnInit {
  endpoints: Endpoint[]

  constructor(
    private endpointStore: EndpointStore,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.endpointStore.getAll();
    this.endpointStore.endpoints.subscribe(data => { this.endpoints = data });
  }
}
