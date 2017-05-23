import { inject, async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { EndpointsListComponent } from './endpoints-list.component';
import { EndpointsDataService } from '../../services/endpoints-data.service'
import { MockEndpointsDataService } from '../../mocks/endpoints-data.service.mock'
import { mockEndpoint, mockEndpointsList } from '../../mocks/endpoint.mock'

describe('EndpointsListComponent', () => {
  let component: EndpointsListComponent;
  let fixture: ComponentFixture<EndpointsListComponent>;
  let mockEdSvc: MockEndpointsDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [EndpointsListComponent]
    }).overrideComponent(EndpointsListComponent, {
      set {
        providers: [
            { provide: EndpointsDataService, useClass: mockEdSvc },
          ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointsListComponent);
    component = fixture.componentInstance;
    mockEdSvc = fixture.debugElement.injector.get(EndpointsDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return endpoints list', fakeAsync(() => {
    const spy = spyOn(mockEdSvc, 'getAll').and.returnValue(
      Observable.of(mockEndpointsList)
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.endpoints).toEqual(mockEndpointsList);
    expect(spy.calls.any()).toEqual(true);
  }));
});
