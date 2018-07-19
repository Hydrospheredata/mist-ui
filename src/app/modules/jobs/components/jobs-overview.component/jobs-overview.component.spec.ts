import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { JobsOverviewComponent } from '@app/modules/jobs/components/jobs-overview.component/jobs-overview.component';
import { JobStatusFilterPipe } from '@app/modules/shared/pipes/job-status-filter.pipe';
import { AgoDatePipe } from '@app/modules/shared/pipes/ago-date.pipe';

describe('JobsOverviewComponent', () => {
  let component: JobsOverviewComponent;
  let fixture: ComponentFixture<JobsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JobsOverviewComponent,
        JobStatusFilterPipe,
        AgoDatePipe
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
