import { inject, async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { EndpointListComponent } from './endpoint-list.component';
import { EndpointDataService } from '@services/endpoint-data.service'
import { MockEndpointDataService } from '@mocks/endpoint-data.service.mock'
import { mockEndpoint, mockEndpointsList } from '@mocks/endpoint.mock'

describe('EndpointListComponent', () => {
  let component: EndpointListComponent;
  let fixture: ComponentFixture<EndpointListComponent>;
  let mockEdSvc: MockEndpointDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [EndpointListComponent, SearchPipe],
      providers: [{ provide: EndpointDataService, useClass: mockEdSvc }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
