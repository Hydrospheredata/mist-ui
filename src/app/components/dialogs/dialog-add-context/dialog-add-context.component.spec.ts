import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddContextComponent } from '@app/components/dialogs/dialog-add-context/dialog-add-context.component';

describe('DialogAddContextComponent', () => {
  let component: DialogAddContextComponent;
  let fixture: ComponentFixture<DialogAddContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
