import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsWrapperComponent } from '@app/modules/jobs/components/jobs-wrapper.component/jobs-wrapper.component';

describe('JobsWrapperComponent', () => {
  let component: JobsWrapperComponent;
  let fixture: ComponentFixture<JobsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
