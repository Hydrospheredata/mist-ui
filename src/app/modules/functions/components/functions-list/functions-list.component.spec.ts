import { inject, async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { FunctionsListComponent } from '@app/modules/functions/components/functions-list/functions-list.component';
// import { FunctionDataService } from '@app/modules/coreservices/function-data.service'
import { MockFunctionDataService } from '@app/mocks/function-data.service.mock'
import { mockFunction, mockFunctionList } from '@app/mocks/function.mock'

describe('FunctionListComponent', () => {
  let component: FunctionsListComponent;
  let fixture: ComponentFixture<FunctionsListComponent>;
  let mockEdSvc: MockFunctionDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [FunctionsListComponent],
      // providers: [{ provide: FunctionDataService, useClass: mockEdSvc }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
