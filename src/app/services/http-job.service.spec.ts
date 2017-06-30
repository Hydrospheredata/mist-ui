import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { HttpJobService } from './http-job.service';

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
