import { TestBed, inject } from '@angular/core/testing';

import { WebSocketJobService } from './web-socket-job.service';

describe('WebSocketJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketJobService]
    });
  });

  it('should be created', inject([WebSocketJobService], (service: WebSocketJobService) => {
    expect(service).toBeTruthy();
  }));
});
