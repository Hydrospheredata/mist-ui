import { XHRBackend } from '@angular/http';
import { MistRequestOptions, HttpService, LoaderService } from '@app/modules/core/services/_index';



function httpServiceFactory(backend: XHRBackend, options: MistRequestOptions, loaderService: LoaderService) {
  return new HttpService(backend, options, loaderService);
}

export { httpServiceFactory };
