import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
// import { HttpService } from '@app/modules/coreservices/http.service/http.service';
import { Observable } from 'rxjs/Observable';
import { Worker } from '@app/modules/shared/models';
import { HttpService } from '@app/modules/core/services/http.service/_index';

@Injectable()
export class HttpWorkersService {

  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = '/workers';
  }

  getAll(): Observable<Worker[]> {
    return this.http.get(this.baseUrl)
      .map((res: Response) => {
        console.log(res.json());
        return res.json();
      })
  }

  get(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
      .map((res: Response) => {
        return res.json();
      })
  }

  delete(worker: Worker) {
    return this.http.delete(`${this.baseUrl}/${worker.name}`)
  }

}
