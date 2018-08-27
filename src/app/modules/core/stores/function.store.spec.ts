import { TestBed, inject } from '@angular/core/testing';

import { FunctionStore } from '@app/modules/core/stores/function.store';

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
