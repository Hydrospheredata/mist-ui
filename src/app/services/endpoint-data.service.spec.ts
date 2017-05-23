import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { EndpointDataService } from './endpoint-data.service';

describe('EndpointDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [EndpointDataService]
    });
  });

  it('should ...', inject([EndpointDataService], (service: EndpointDataService) => {
    expect(service).toBeTruthy();
  }));
});
