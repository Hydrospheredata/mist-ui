import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFunctionFormComponent } from '@app/components/dialogs/dialog-function-form/dialog-function-form.component';

describe('DialogFunctionFormComponent', () => {
  let component: DialogFunctionFormComponent;
  let fixture: ComponentFixture<DialogFunctionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFunctionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFunctionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
