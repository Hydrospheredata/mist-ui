import { Component, OnInit } from '@angular/core';
import { EndpointsDataService } from '../../services/endpoints-data.service';
import { Endpoint } from '../../models/endpoint'

@Component({
  selector: 'endpoints-list',
  templateUrl: './endpoints-list.component.html',
  styleUrls: ['./endpoints-list.component.css'],
  providers: [EndpointsDataService]
})
export class EndpointsListComponent implements OnInit {
  errorMessage: string;
  endpoints: Endpoint[]=[];

  constructor(private endpointsDataService: EndpointsDataService) { }

  ngOnInit() {
    this.getEndpoints();
  }

  getEndpoints(): void {
    this.endpointsDataService.getAll()
                                .subscribe(
                                  endpoints => this.endpoints=endpoints,
                                  error => this.errorMessage = <any>error);
  }

}
