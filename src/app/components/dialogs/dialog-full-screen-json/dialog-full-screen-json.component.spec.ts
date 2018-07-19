import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFullScreenJsonComponent } from '@app/components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';

describe('DialogFullScreenJsonComponent', () => {
  let component: DialogFullScreenJsonComponent;
  let fixture: ComponentFixture<DialogFullScreenJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFullScreenJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFullScreenJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
