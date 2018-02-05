import { TestBed, inject } from '@angular/core/testing';

import { FunctionStore } from './function.store';

describe('JobStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionStore]
    });
  });

  it('should be created', inject([FunctionStore], (service: FunctionStore) => {
    expect(service).toBeTruthy();
  }));
});
