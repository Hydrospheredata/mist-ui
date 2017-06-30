import { TestBed, inject } from '@angular/core/testing';

import { JobStore } from './job.store';

describe('JobStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobStore]
    });
  });

  it('should be created', inject([JobStore], (service: JobStore) => {
    expect(service).toBeTruthy();
  }));
});
