import { inject, async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { EndpointListComponent } from './endpoint-list.component';
import { EndpointDataService } from '../../services/endpoint-data.service'
import { MockEndpointDataService } from '../../mocks/endpoint-data.service.mock'
import { mockEndpoint, mockEndpointList } from '../../mocks/endpoint.mock'

describe('EndpointListComponent', () => {
  let component: EndpointListComponent;
  let fixture: ComponentFixture<EndpointListComponent>;
  let mockEdSvc: MockEndpointDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [EndpointListComponent]
    }).overrideComponent(EndpointListComponent, {
      set {
        providers: [
            { provide: EndpointDataService, useClass: mockEdSvc },
          ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointListComponent);
    component = fixture.componentInstance;
    mockEdSvc = fixture.debugElement.injector.get(EndpointDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return endpoints list', fakeAsync(() => {
    const spy = spyOn(mockEdSvc, 'getAll').and.returnValue(
      Observable.of(mockEndpointList)
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.endpoints).toEqual(mockEndpointList);
    expect(spy.calls.any()).toEqual(true);
  }));
});
