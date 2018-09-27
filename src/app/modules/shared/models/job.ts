export class Job {
    public jobId: string;
    public status: string;
    public context: string;
    public createTime: number;
    public endTime: number;
    public startTime: number;
    public functionId: string;
    public jobResult: string;
    public params: any;
    public source: string;
    public workerId: string;

    constructor(jobInfo: any) {
        this.jobId = jobInfo['jobId'];
        this.status = jobInfo['status'];
        this.context = jobInfo['context'];
        this.functionId = jobInfo['function'];
        this.createTime = jobInfo['createTime'];
        this.endTime = jobInfo['endTime'];
        this.startTime = jobInfo['startTime'];
        this.jobResult = jobInfo['jobResult'];
        this.params = jobInfo['params'];
        this.source = jobInfo['source'];
        this.workerId = jobInfo['workerId'];
    }

    public isFinished() {
        return ['finished'].includes(this.status)
    }

    public isFailed() {
        return ['failed', 'cancelled'].includes(this.status)
    }

    public isWorkerAssigned() {
        return ['worker-assigned'].includes(this.status);
    }

    public isRunning() {
        return ['initialized', 'started', 'job-file-downloading', 'worker-assigned', 'queued'].includes(this.status)
    }

    public isCanceling() {
        return ['cancelling'].includes(this.status)
    }

    public runningTime() {
        return this.startTime || this.createTime
    }
}
