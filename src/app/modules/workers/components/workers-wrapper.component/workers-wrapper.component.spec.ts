import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersWrapperComponent } from './workers-wrapper.component';

describe('WorkersWrapperComponent', () => {
  let component: WorkersWrapperComponent;
  let fixture: ComponentFixture<WorkersWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkersWrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
