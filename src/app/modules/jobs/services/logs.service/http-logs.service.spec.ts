import { TestBed, inject } from '@angular/core/testing';

import { HttpLogsService } from '@app/modules/jobs/services/logs.service/http-logs.service';

describe('HttpLogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpLogsService]
    });
  });

  it('should be created', inject([HttpLogsService], (service: HttpLogsService) => {
    expect(service).toBeTruthy();
  }));
});
