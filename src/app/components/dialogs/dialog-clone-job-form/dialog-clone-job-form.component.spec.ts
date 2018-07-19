import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCloneJobFormComponent } from '@app/components/dialogs/dialog-clone-job-form/dialog-clone-job-form.component';

describe('DialogCloneJobFormComponent', () => {
  let component: DialogCloneJobFormComponent;
  let fixture: ComponentFixture<DialogCloneJobFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCloneJobFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCloneJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
