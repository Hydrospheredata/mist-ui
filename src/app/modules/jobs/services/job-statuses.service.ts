import { Injectable } from "@angular/core";

@Injectable()
export class JobStatusesService {
    private readonly RUNNING_STATUSES: string[] = ['initialized', 'queued', 'started', 'worker-assigned', 'job-file-downloading', 'cancelling'];
    private readonly FAILED_STATUSES: string[] = ['cancelled', 'failed'];
    private readonly FINISHED_STATUSES: string[] = ['finished'];

    public isRunning(jobStatus: string){
        return this.RUNNING_STATUSES.includes(jobStatus)
    }

    public isFailed(jobStatus: string){
        return this.FAILED_STATUSES.includes(jobStatus)
    }

    public isFinished(jobStatus: string){
        return this.FINISHED_STATUSES.includes(jobStatus)
    }
}