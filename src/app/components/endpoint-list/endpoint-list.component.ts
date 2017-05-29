import { Component, OnInit } from '@angular/core';
import { EndpointDataService } from '../../services/endpoint-data.service';
import { Endpoint } from '../../models/endpoint'

@Component({
  selector: 'endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.css']
})
export class EndpointListComponent implements OnInit {
  errorMessage: string;
  endpoints: Endpoint[]=[];

  constructor(private endpointDataService: EndpointDataService) { }

  ngOnInit() {
    this.getEndpoints();
  }

  getEndpoints(): void {
    this.endpointDataService.getAll()
                                .subscribe(
                                  endpoints => this.endpoints = endpoints,
                                  error => this.errorMessage = <any>error);
  }
}
