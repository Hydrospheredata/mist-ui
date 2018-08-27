import { Action } from '@ngrx/store';

export enum JobLogsActionTypes {
    GetLogs = '[JobLogs] Get logs of current job',
    GetLogsSuccess = '[JobLogs] Get logs of current job with success',
    GetLogsFail = '[JobLogs] Get logs of current job with fail'
};

export class GetLogs implements Action {
    readonly type = JobLogsActionTypes.GetLogs;
}
export class GetLogsSuccess implements Action {
    readonly type = JobLogsActionTypes.GetLogsSuccess;

    constructor(public payload: string[]) { }
}
export class GetLogsFail implements Action {
    readonly type = JobLogsActionTypes.GetLogsFail;

    constructor(public error: any) { }
}

export type JobLogsActions
    = GetLogs
    | GetLogsSuccess
    | GetLogsFail;
