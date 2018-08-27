export interface IJobLogs {
    logs: string[];
}

export class JobLogs implements IJobLogs {
    public logs: string[];

    constructor(params: any) {
        this.logs = params['logs']
    }
}