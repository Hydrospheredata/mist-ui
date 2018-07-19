import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { HttpJobService } from '@app/modules/core/services/jobs.service/http-job.service';

describe('HttpJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [HttpJobService]
    });
  });

  it('should ...', inject([HttpJobService], (service: HttpJobService) => {
    expect(service).toBeTruthy();
  }));
});
