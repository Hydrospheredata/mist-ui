import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FunctionDetailsComponent } from './function-details.component';
import { JobStatusFilterPipe } from '@pipes/job-status-filter.pipe';
import { AgoDatePipe } from '@pipes/ago-date.pipe';

describe('FunctionDetailsComponent', () => {
  let component: FunctionDetailsComponent;
  let fixture: ComponentFixture<FunctionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FunctionDetailsComponent,
        JobStatusFilterPipe,
        AgoDatePipe
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
