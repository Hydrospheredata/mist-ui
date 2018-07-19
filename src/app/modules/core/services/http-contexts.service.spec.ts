import { TestBed, inject } from '@angular/core/testing';

import { HttpContextsService } from '@app/modules/core/services/http-contexts.service';

describe('HttpContextsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpContextsService]
    });
  });

  it('should be created', inject([HttpContextsService], (service: HttpContextsService) => {
    expect(service).toBeTruthy();
  }));
});
