import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEndpointComponent } from './dialog-add-endpoint.component';

describe('DialogAddEndpointComponent', () => {
  let component: DialogAddEndpointComponent;
  let fixture: ComponentFixture<DialogAddEndpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddEndpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
