import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EndpointDataService } from '../../services/endpoint-data.service';
import { Endpoint } from '../../models/endpoint'

@Component({
  selector: 'endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.css']
})
export class EndpointListComponent implements OnInit {
  endpoints: Observable<Endpoint[]>

  constructor(private endpointDataService: EndpointDataService) { }

  ngOnInit() {
    this.endpoints = this.endpointDataService.endpoints
    this.endpointDataService.getAll();
  }
}
