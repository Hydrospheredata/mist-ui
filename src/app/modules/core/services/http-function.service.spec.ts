import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { HttpFunctionService } from '@app/modules/core/services/http-function.service';

describe('FunctionDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [HttpFunctionService]
    });
  });

  it('should ...', inject([HttpFunctionService], (service: HttpFunctionService) => {
    expect(service).toBeTruthy();
  }));
});
