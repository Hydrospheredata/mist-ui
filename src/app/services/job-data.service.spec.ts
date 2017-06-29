import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { JobDataService } from './job-data.service';

describe('JobDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [JobDataService]
    });
  });

  it('should ...', inject([JobDataService], (service: JobDataService) => {
    expect(service).toBeTruthy();
  }));
});
