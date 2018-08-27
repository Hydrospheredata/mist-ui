import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';
import {
    Http,
    RequestOptionsArgs,
    Response,
    Headers,
    XHRBackend
} from '@angular/http';
import { Location } from '@angular/common';

import { MistRequestOptions } from '@app/modules/core/services/http.service/mist-request-options';

import { LoaderService } from '@app/modules/core/services/loader.service/loader.service';



@Injectable()
export class HttpService extends Http {
    port: string;
    apiUrl: string;
    private requestCount: number;

    constructor(
        backend: XHRBackend,
        defaultOptions: MistRequestOptions,
        // private location: Location,
        private loaderService: LoaderService
    ) {
        super(backend, defaultOptions);
        this.requestCount = 0;
        this.port = environment.production ? window.location.port : environment.port;
        // const path = location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
        // this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}${path}`;

        this.apiUrl = environment.production ?
            `${window.location.protocol}//${window.location.hostname}:${window.location.port}${environment.apiUrl}` :
            `http://localhost:${environment.port}${environment.apiUrl}`;
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();

        return super.get(this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    post(url: string, body, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();

        return super.post(this.getFullUrl(url), body, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    put(url: string, body, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();

        return super.put(this.getFullUrl(url), body, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {

        this.showLoader();

        return super.delete(this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new MistRequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        return options;
    }

    private getFullUrl(url: string): string {
        return this.apiUrl + url;
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    private onSuccess(res: Response): void {
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        if (this.requestCount === 0) {
            this.loaderService.show();
        }
        this.requestCount++;
    }

    private hideLoader(): void {
        this.requestCount--;
        if (this.requestCount === 0) {
            this.loaderService.hide();
        }
    }
}
