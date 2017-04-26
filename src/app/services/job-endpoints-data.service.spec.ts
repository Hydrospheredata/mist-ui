import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { JobEndpointsDataService } from './job-endpoints-data.service';

describe('JobEndpointsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [JobEndpointsDataService]
    });
  });

  it('should ...', inject([JobEndpointsDataService], (service: JobEndpointsDataService) => {
    expect(service).toBeTruthy();
  }));
});
