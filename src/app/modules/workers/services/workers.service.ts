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
            .map((res: Response) => this.extractWorkers(res))
    }

    get(id): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`)
            .map((res: Response) => res.json())
    }

    delete(workerName: string) {
        return this.http.delete(`${this.baseUrl}/${workerName}`);
    }

    private extractWorkers(res: Response) {
        const data = res.json();
        const workers: Worker[] = [];
        for (let index in data) {
            if (data.hasOwnProperty(index)) {
                let worker = this.toWorker(data[index]);
                workers.push(worker);
            }
        }
        return workers;
    }

    private toWorker(data): Worker {
        const job = new Worker(data);
        return job;
    }

}
