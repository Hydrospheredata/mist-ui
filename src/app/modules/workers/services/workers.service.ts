import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Worker, Job } from '@app/modules/shared/models';
import { HttpService } from '@app/modules/core/services/http.service/_index';

@Injectable()
export class HttpWorkersService {

    private baseUrl: string;

    constructor(private http: HttpService) {
        this.baseUrl = '/workers';
    }

    public getAll(): Observable<Worker[]> {
        return this.http.get(this.baseUrl)
            .map((res: Response) => this.extractWorkers(res))
    }

    public get(id): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`)
            .map((res: Response) => res.json())
    }

    public getJobs(params): Observable<any> {
        let url = this.baseUrl + `/${params.workerId}/jobs?paginate=true`;

        if (params.pagination) {
            url += `&offset=${params.pagination.offset}`
        }

        return this.http.get(url)
            .map((res: Response) => { return this.extractJobs(res) })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.text() || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${body}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractJobs(res: Response) {
        const data = res.json();
        const jobs: Job[] = [];
        if (data.jobs) {
            for (let index in data.jobs) {
                if (data.jobs.hasOwnProperty(index)) {
                    let job = this.toJob(data.jobs[index]);
                    jobs.push(job);
                }
            }
            return { jobs: jobs, total: data.total };
        } else {
            for (let index in data) {
                if (data.hasOwnProperty(index)) {
                    let job = this.toJob(data[index]);
                    jobs.push(job);
                }
            }
            return jobs;
        }
    }

    private toJob(data): Job {
        return new Job(data);
    }

    public delete(workerName: string) {
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
