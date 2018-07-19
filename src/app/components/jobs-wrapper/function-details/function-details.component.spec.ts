import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FunctionDetailsComponent } from '@app/components/jobs-wrapper/function-details/function-details.component';
import { JobStatusFilterPipe, AgoDatePipe } from '@app/modules/shared/pipes';

describe('FunctionDetailsComponent', () => {
  let component: FunctionDetailsComponent;
  let fixture: ComponentFixture<FunctionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FunctionDetailsComponent,
        JobStatusFilterPipe,
        AgoDatePipe
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
