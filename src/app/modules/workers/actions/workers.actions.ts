import { Action } from '@ngrx/store';
import { Job } from '@app/modules/shared/models';

export enum WorkersActionTypes {
    Get = '[Workers] Get list of all workers',
    GetSuccess = '[Workers] Get list of all workers with success',
    GetFail = '[Workers] Get list of all workers with fail',
    Delete = '[Workers] Delete worker',
    DeleteSuccess = '[Workers] Delete worker with success',
    DeleteFail = '[Workers] Delete worker with fail',
    GetJobsForWorker = '[Worker jobs] Get all jobs for current worker',
    GetJobsForWorkerSuccess = '[Worker jobs] Get all jobs for current worker with success',
    GetJobsForWorkerFail = '[Worker jobs] Get all jobs for current worker with fail',
};

export class Get implements Action {
    readonly type = WorkersActionTypes.Get;
}

export class GetSuccess implements Action {
    readonly type = WorkersActionTypes.GetSuccess;
    constructor(public payload: any) { }
}

export class GetFail implements Action {
    readonly type = WorkersActionTypes.GetFail;
    constructor(public payload: any) { }
}

export class Delete implements Action {
    readonly type = WorkersActionTypes.Delete;

    constructor(public workerName: string) { }
}

export class DeleteSuccess implements Action {
    readonly type = WorkersActionTypes.DeleteSuccess;

    constructor(public payload: any) { }
}

export class DeleteFail implements Action {
    readonly type = WorkersActionTypes.DeleteFail;

    constructor(public error) { }
}

export class GetJobsForWorker implements Action {
    readonly type = WorkersActionTypes.GetJobsForWorker;
    constructor(public options?: any) { };
}

export class GetJobsForWorkerSuccess implements Action {
    readonly type = WorkersActionTypes.GetJobsForWorkerSuccess;

    constructor(public jobs: Job[]) { }
}

export class GetJobsForWorkerFail implements Action {
    readonly type = WorkersActionTypes.GetJobsForWorkerFail;

    constructor(public error) { }
}

export type WorkersActions
    = Get
    | GetSuccess
    | GetFail
    | Delete
    | DeleteSuccess
    | DeleteFail
    | GetJobsForWorker
    | GetJobsForWorkerSuccess
    | GetJobsForWorkerFail;
