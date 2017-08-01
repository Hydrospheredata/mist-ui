import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MistLoaderComponent } from './mist-loader.component';

describe('MistLoaderComponent', () => {
  let component: MistLoaderComponent;
  let fixture: ComponentFixture<MistLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MistLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MistLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
