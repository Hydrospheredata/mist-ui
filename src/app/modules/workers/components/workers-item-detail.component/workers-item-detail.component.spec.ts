import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersItemDetailComponent } from './workers-item-detail.component';

describe('WorkersItemDetailComponent', () => {
  let component: WorkersItemDetailComponent;
  let fixture: ComponentFixture<WorkersItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkersItemDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
