import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { EndpointDataService } from '../../../services/endpoint-data.service'
import { Job } from '../../../models/job'
import { Endpoint } from '../../../models/endpoint'

@Component({
  selector: 'endpoint-details',
  templateUrl: './endpoint-details.component.html',
  styleUrls: ['./endpoint-details.component.css']
})
export class EndpointDetailsComponent implements OnInit {
  endpoint: Observable<Endpoint>;

  private sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private endpointDataService: EndpointDataService,
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params
      .map(params => params['endpointId'])
      .subscribe((id) =>
        {
          this.endpoint = this.endpointDataService.endpoints
                            .map(items => items.find(item => item.name === id));
        });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
