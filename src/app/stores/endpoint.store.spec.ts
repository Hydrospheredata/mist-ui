import { TestBed, inject } from '@angular/core/testing';

import { EndpointStore } from './endpoint.store';

describe('JobStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndpointStore]
    });
  });

  it('should be created', inject([EndpointStore], (service: EndpointStore) => {
    expect(service).toBeTruthy();
  }));
});
