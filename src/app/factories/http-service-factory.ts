import { XHRBackend } from '@angular/http';
import { MistRequestOptions } from '@services/mist-request-options';
import { HttpService } from '@services/http.service';
import { LoaderService } from '@services/loader.service';
import { Location } from '@angular/common';

function httpServiceFactory(backend: XHRBackend, options: MistRequestOptions, location:Location, loaderService: LoaderService ) {
  return new HttpService(backend, options, location, loaderService);
}

export { httpServiceFactory };
