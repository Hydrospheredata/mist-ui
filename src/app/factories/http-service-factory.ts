import { XHRBackend } from '@angular/http';
import { Location } from '@angular/common';
import { MistRequestOptions, HttpService, LoaderService } from '@services/_index';



function httpServiceFactory(backend: XHRBackend, options: MistRequestOptions, location:Location, loaderService: LoaderService ) {
  return new HttpService(backend, options, location, loaderService);
}

export { httpServiceFactory };
