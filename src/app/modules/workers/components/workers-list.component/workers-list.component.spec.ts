import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersListComponent } from '@app/modules/workers/components/workers-list.component/workers-list.component';

describe('WorkersListComponent', () => {
  let component: WorkersListComponent;
  let fixture: ComponentFixture<WorkersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
