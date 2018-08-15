import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJobFormComponent } from '@app/components/dialogs/dialog-job-form/dialog-job-form.component';

describe('DialogJobFormComponent', () => {
  let component: DialogJobFormComponent;
  let fixture: ComponentFixture<DialogJobFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogJobFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
