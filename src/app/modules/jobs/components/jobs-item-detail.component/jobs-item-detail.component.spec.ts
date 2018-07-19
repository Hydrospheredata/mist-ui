import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
// import { MaterialModule } from '@angular/material';
import { CodemirrorModule } from 'ng2-codemirror';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JobsItemDetailComponent } from '@app/modules/jobs/components/jobs-item-detail.component/jobs-item-detail.component';
import { DialogFullScreenJsonComponent } from '@app/components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';
import { AgoDatePipe } from '@app/modules/shared/pipes/ago-date.pipe';
// import { FunctionDataService } from '@app/modules/coreservices/function-data.service';
// import { JobDataService } from '@app/modules/coreservices/job-data.service';
import { MockFunctionDataService } from '@app/mocks/function-data.service.mock';
import { MockJobDataService } from '@app/mocks/job-data.service.mock';
import { MockActivatedRoute } from '@app/mocks/activated-route.mock';
import { Job } from '@app/modules/shared/models';
import { Function } from '@app/modules/shared/models';
import { mockJob } from '@app/mocks/job.mock';
import { mockFunction } from '@app/mocks/function.mock';

describe('JobsItemDetailComponent', () => {
  let component: JobsItemDetailComponent;
  let fixture: ComponentFixture<JobsItemDetailComponent>;
  let job: Job;
  let functionInfo: Function;
  let functionStub;
  let jobStub;
  let activatedRoute: MockActivatedRoute;

  beforeEach(async(() => {
    activatedRoute = new MockActivatedRoute();
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        // MaterialModule,
        CodemirrorModule,
        FormsModule
      ],
      declarations: [
        // JobsItemDetailComponent,
        DialogFullScreenJsonComponent,
        AgoDatePipe
      ],
      providers: [
        // { provide: FunctionDataService, useClass: MockFunctionDataService },
        // { provide: JobDataService, useClass: MockJobDataService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JobsItemDetailComponent);
    component = fixture.componentInstance;
    functionInfo = mockFunction;
    job = mockJob;
    activatedRoute.testParams = { functionId: functionInfo.name, jobId: job.jobId };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  }));

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('loads function', () => {
    // expect(component.functionInfo).toBeTruthy();
  });

  it('loads job', () => {
    expect(component.job).toBeTruthy();
  });
});
