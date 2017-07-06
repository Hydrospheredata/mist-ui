import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EndpointDetailsComponent } from './endpoint-details.component';
import { JobStatusFilterPipe } from '@pipes/job-status-filter.pipe';
import { AgoDatePipe } from '@pipes/ago-date.pipe';

describe('EndpointDetailsComponent', () => {
  let component: EndpointDetailsComponent;
  let fixture: ComponentFixture<EndpointDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EndpointDetailsComponent,
        JobStatusFilterPipe,
        AgoDatePipe
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
