import { TestBed, inject } from '@angular/core/testing';

import { WebsocketService } from '@app/modules/core/services/websocket.service/websocket.service';

describe('WebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketService]
    });
  });

  it('should be created', inject([WebsocketService], (service: WebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
