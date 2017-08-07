import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEndpointFormComponent } from './dialog-endpoint-form.component';

describe('DialogEndpointFormComponent', () => {
  let component: DialogEndpointFormComponent;
  let fixture: ComponentFixture<DialogEndpointFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEndpointFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEndpointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
