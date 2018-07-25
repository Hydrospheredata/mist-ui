import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum JobsRunningActionTypes {
    GetRunning = '[Job] Get list of all running jobs',
    GetRunningSuccess = '[Job] Get list of all running jobs with success',
    GetRunningFail = '[Job] Get list of all running jobs with fail',
};

export class GetRunning implements Action {
    readonly type = JobsRunningActionTypes.GetRunning;
}
export class GetRunningSuccess implements Action {
    readonly type = JobsRunningActionTypes.GetRunningSuccess;
    constructor(public payload: any) { }
}
export class GetRunningFail implements Action {
    readonly type = JobsRunningActionTypes.GetRunningFail;
    constructor(public error: any) { }
}

export type JobsRunningActions
    = GetRunning
    | GetRunningSuccess
    | GetRunningFail;
