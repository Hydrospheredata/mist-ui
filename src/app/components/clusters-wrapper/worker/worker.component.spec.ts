import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerComponent } from '@app/components/clusters-wrapper/worker/worker.component';

describe('WorkerComponent', () => {
  let component: WorkerComponent;
  let fixture: ComponentFixture<WorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
