import { TestBed, inject } from '@angular/core/testing';

import { HttpLogsService } from './http-logs.service';

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
