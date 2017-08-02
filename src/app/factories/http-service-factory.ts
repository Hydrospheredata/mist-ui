import { XHRBackend } from '@angular/http';
import { MistRequestOptions } from '@services/mist-request-options';
import { HttpService } from '@services/http.service';
import { LoaderService } from '@services/loader.service';

function httpServiceFactory(backend: XHRBackend, options: MistRequestOptions, loaderService: LoaderService ) {
  return new HttpService(backend, options, loaderService);
}

export { httpServiceFactory };
