import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { HttpEndpointService } from './http-endpoint.service';

describe('EndpointDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [HttpEndpointService]
    });
  });

  it('should ...', inject([HttpEndpointService], (service: HttpEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
