import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Function } from '@app/modules/shared/models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpService } from '@app/modules/core/services/http.service/http.service';

@Injectable()
export class HttpFunctionService {
    private baseUrl: string;

    constructor(private http: HttpService) {
        this.baseUrl = `/functions`;
    }

    public getAll(): Observable<Function[]> {
        return this.http.get(this.baseUrl)
            .map((res: Response) => this.extractFunctions(res))
            .catch(this.handleError);
    }

    public get(id: string): Observable<Function> {
        let apiUrl = this.baseUrl + `/${id}`;
        return this.http.get(apiUrl)
            .map((res: Response) => this.extractFunction(res))
            .catch(this.handleError);
    }

    private extractFunctions(res: Response) {
        let data = res.json();
        let functions: Function[] = [];
        for (let index in data) {
            if (data.hasOwnProperty(index)) {
                let functionInfo = this.toFunction(data[index]);
                functions.push(functionInfo);
            }
        }
        return functions;
    }

    private extractFunction(res: Response) {
        let data;
        try {
            data = res.json();
        } catch (e) {
            return Observable.throw(e)
        } finally {
            if (data) {
                return this.toFunction(data);
            }
        }
    }

    private toFunction(data) {
        const fn = new Function({
            name: data['name'],
            lang: data['lang'],
            tags: data['tags'],
            defaultContext: data['defaultContext'],
            path: data['path'],
            execute: data['execute'],
            className: data['className']
        });
        return fn;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            let body;
            try {
                body = error.json();
            } catch (e) {
                body = error.text();
            }

            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public createFunction(functionInfo: Function) {
        const _function: string = JSON.stringify(functionInfo);

        return this.http.post(this.baseUrl, _function)
            .map(this.extractFunction.bind(this))
            .catch(this.handleError);
    }

    public updateFunction(functionInfo: Function) {
        const _function: string = JSON.stringify(functionInfo);

        return this.http.put(this.baseUrl, _function)
            .map(this.extractFunction.bind(this))
            .catch(this.handleError);
    }

}
