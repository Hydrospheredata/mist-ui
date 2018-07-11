import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Worker } from '@shared/models';
import { HttpService } from '@core/services/http.service/_index';

@Injectable()
export class HttpWorkersService {

    private baseUrl: string;

    constructor(private http: HttpService) {
        this.baseUrl = '/workers';
    }

    getAll(): Observable<Worker[]> {
        return this.http.get(this.baseUrl)
            .map((res: Response) => res.json())
    }

    get(id): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`)
            .map((res: Response) => res.json())
    }

    delete(worker: Worker) {
        return this.http.delete(`${this.baseUrl}/${worker.name}`)
    }

}
