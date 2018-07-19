import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJobLogsComponent } from '@app/components/dialogs/dialog-job-logs/dialog-job-logs.component';

describe('DialogJobLogsComponent', () => {
  let component: DialogJobLogsComponent;
  let fixture: ComponentFixture<DialogJobLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogJobLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogJobLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
