import { Component, OnInit, Input } from '@angular/core';
import { Endpoint } from '../../models/endpoint'

@Component({
  selector: 'endpoint-details',
  templateUrl: './endpoint-details.component.html',
  styleUrls: ['./endpoint-details.component.css']
})
export class EndpointDetailsComponent implements OnInit {
  @Input() endpoint: Endpoint;
  constructor() { }

  ngOnInit() {
  }

}
