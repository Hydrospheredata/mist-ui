import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {FunctionInfo} from '@models/function';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpService} from './http.service/http.service';

@Injectable()
export class HttpFunctionService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `/functions`;
  }

  public getAll(): Observable<FunctionInfo[]> {
    return this.http.get(this.baseUrl)
      .map((res: Response) => this.extractEndpoints(res))
      .catch(this.handleError);
  }

  public get(id: string): Observable<FunctionInfo> {
    let apiUrl = this.baseUrl + `/${id}`;
    return this.http.get(apiUrl)
      .map((res: Response) => this.extractEndpoint(res))
      .catch(this.handleError);
  }

  private extractEndpoints(res: Response) {
    let data = res.json();
    let functions: FunctionInfo[] = [];
    for (let index in data) {
      let functionInfo = this.toFunction(data[index]);
      functions.push(functionInfo);
    }
    return functions;
  }

  private extractEndpoint(res: Response) {
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

  private extractData(res: Response) {
    let data = res.json();
    return data || {};
  }

  private toFunction(data) {
    const fn = new FunctionInfo({
      name: data['name'],
      lang: data['lang'],
      tags: data['tags'],
      defaultContext: data['defaultContext'],
      path: data['path'],
      execute: data['execute'],
      className: data['className'],
      contextSettings: data['contextSettings'],
      endpointStore: data['endpointStore'],
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

  public createFunction(functionInfo: FunctionInfo) {
    const _function: string = JSON.stringify(functionInfo);

    return this.http.post(this.baseUrl, _function)
      .map(this.extractEndpoint.bind(this))
      .catch(this.handleError);
  }

  public updateFunction(functionInfo: FunctionInfo) {
    const _function: string = JSON.stringify(functionInfo);

    return this.http.put(this.baseUrl, _function)
      .map(this.extractEndpoint.bind(this))
      .catch(this.handleError);
  }

}
