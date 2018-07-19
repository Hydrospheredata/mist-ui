import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClustersWrapperComponent } from '@app/components/clusters-wrapper/clusters-wrapper.component';

describe('ClustersWrapperComponent', () => {
  let component: ClustersWrapperComponent;
  let fixture: ComponentFixture<ClustersWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClustersWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClustersWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
