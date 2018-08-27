import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLogsComponent } from '@app/modules/jobs/components/job-logs.component/job-logs.component';

describe('JobLogsComponent', () => {
  let component: JobLogsComponent;
  let fixture: ComponentFixture<JobLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
