import { inject, async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { JobsListComponent } from '@app/modules/jobs/components/jobs-list.component/jobs-list.component';
// import { FunctionDataService } from '@app/modules/coreservices/functionId-data.service'
import { MockFunctionDataService } from '@app/mocks/function-data.service.mock'
import { mockFunction, mockFunctionList } from '@app/mocks/function.mock'

describe('JobsListComponent', () => {
  let component: JobsListComponent;
  let fixture: ComponentFixture<JobsListComponent>;
  let mockFnSvc: MockFunctionDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [JobsListComponent],
      // providers: [{ provide: FunctionDataService, useClass: mockFnSvc }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
