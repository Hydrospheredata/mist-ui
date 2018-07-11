import { inject, async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { FunctionListComponent } from './function-list.component';
// import { FunctionDataService } from '@app/modules/coreservices/functionId-data.service'
import { MockFunctionDataService } from '@mocks/function-data.service.mock'
import { mockFunction, mockFunctionList } from '@mocks/function.mock'

describe('FunctionListComponent', () => {
  let component: FunctionListComponent;
  let fixture: ComponentFixture<FunctionListComponent>;
  let mockFnSvc: MockFunctionDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [FunctionListComponent],
      // providers: [{ provide: FunctionDataService, useClass: mockFnSvc }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
