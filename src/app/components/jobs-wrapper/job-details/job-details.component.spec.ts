import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { CodemirrorModule } from 'ng2-codemirror';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JobDetailsComponent } from './job-details.component';
import { DialogFullScreenJsonComponent } from '@components/dialogs/dialog-full-screen-json/dialog-full-screen-json.component';
import { AgoDatePipe } from '@pipes/ago-date.pipe';
import { EndpointDataService } from '@services/endpoint-data.service';
import { JobDataService } from '@services/job-data.service';
import { MockEndpointDataService } from '@mocks/endpoint-data.service.mock';
import { MockJobDataService } from '@mocks/job-data.service.mock';
import { MockActivatedRoute } from '@mocks/activated-route.mock';
import { Job } from '@models/job';
import { Endpoint } from '@models/endpoint';
import { mockJob } from '@mocks/job.mock';
import { mockEndpoint } from '@mocks/endpoint.mock';

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;
  let job: Job;
  let endpoint: Endpoint;
  let endpointStub;
  let jobStub;
  let activatedRoute: MockActivatedRoute;

  beforeEach(async(() => {
    activatedRoute = new MockActivatedRoute();
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        CodemirrorModule,
        FormsModule
      ],
      declarations: [
        JobDetailsComponent,
        DialogFullScreenJsonComponent,
        AgoDatePipe
      ],
      providers: [
        { provide: EndpointDataService, useClass: MockEndpointDataService },
        { provide: JobDataService, useClass: MockJobDataService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;
    endpoint = mockEndpoint;
    job = mockJob;
    activatedRoute.testParams = { endpointId: endpoint.name, jobId: job.jobId };
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
  }));

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('loads endpoint', () => {
    expect(component.endpoint).toBeTruthy();
  });

  it('loads job', () => {
    expect(component.job).toBeTruthy();
  });
});
