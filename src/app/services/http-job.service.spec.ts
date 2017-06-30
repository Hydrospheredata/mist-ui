import { TestBed, inject } from '@angular/core/testing';

import { HttpJobService } from './http-job.service';

describe('HttpJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpJobService]
    });
  });

  it('should ...', inject([HttpJobService], (service: HttpJobService) => {
    expect(service).toBeTruthy();
  }));
});
