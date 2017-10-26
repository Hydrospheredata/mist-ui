import { TestBed, inject } from '@angular/core/testing';

import { HttpArtifactsService } from './http-artifacts.service';

describe('HttpArtifactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpArtifactsService]
    });
  });

  it('should be created', inject([HttpArtifactsService], (service: HttpArtifactsService) => {
    expect(service).toBeTruthy();
  }));
});
