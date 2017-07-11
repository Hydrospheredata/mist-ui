import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsLogsComponent } from './jobs-logs.component';

describe('JobsLogsComponent', () => {
  let component: JobsLogsComponent;
  let fixture: ComponentFixture<JobsLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
