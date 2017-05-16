import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { EndpointsDataService } from './endpoints-data.service';

describe('EndpointsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [EndpointsDataService]
    });
  });

  it('should ...', inject([EndpointsDataService], (service: EndpointsDataService) => {
    expect(service).toBeTruthy();
  }));
});
