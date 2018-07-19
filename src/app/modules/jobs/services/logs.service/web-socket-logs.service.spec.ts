import { TestBed, inject } from '@angular/core/testing';

import { WebSocketLogsService } from '@app/modules/jobs/services/logs.service/web-socket-logs.service';

describe('WebSocketLogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketLogsService]
    });
  });

  it('should be created', inject([WebSocketLogsService], (service: WebSocketLogsService) => {
    expect(service).toBeTruthy();
  }));
});
