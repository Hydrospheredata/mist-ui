import { Action } from '@ngrx/store';
import { Job } from '@app/modules/shared/models';

export enum JobActionTypes {
    Get = '[Job] Get list of all jobs',
    GetSuccess = '[Job] Get list of all jobs with success',
    GetFail = '[Job] Get list of all jobs with fail',
    GetById = '[Job] Get job by id',
    GetByIdSuccess = '[Job] Get job by id with success',
    GetByIdFail = '[Job] Get job by id with fail',
    Add = '[Job] Add job',
    AddSuccess = '[Job] Add job with success',
    AddFail = '[Job] Add job with fail',
    Delete = '[Job] Delete job',
    DeleteSuccess = '[Job] Delete job with success',
    DeleteFail = '[Job] Delete job with fail',
    Update = '[Job] Update job',
    UpdateSuccess = '[Job] Update job with success',
    UpdateFail = '[Job] Update job with fail',
};

export class Get implements Action {
    readonly type = JobActionTypes.Get;
}
export class GetSuccess implements Action {
    readonly type = JobActionTypes.GetSuccess;
    constructor(public payload: Job[]) { }
}
export class GetFail implements Action {
    readonly type = JobActionTypes.GetFail;
    constructor(public error: any) { }
}

export class GetById implements Action {
    readonly type = JobActionTypes.GetById;
    constructor(public id: string) { }
}
export class GetByIdSuccess implements Action {
    readonly type = JobActionTypes.GetByIdSuccess;
    constructor(public payload: Job) { }
}
export class GetByIdFail implements Action {
    readonly type = JobActionTypes.GetByIdFail;
    constructor(public error: any) { }
}

export class Add implements Action {
    readonly type = JobActionTypes.Add;
    constructor(public functionId, public params) { }
}
export class AddSuccess implements Action {
    readonly type = JobActionTypes.AddSuccess;
    constructor(public payload: Job) { }
}
export class AddFail implements Action {
    readonly type = JobActionTypes.AddFail;
    constructor(public error: any) { }
}

export class Delete implements Action {
    readonly type = JobActionTypes.Delete;
    constructor(public jobId: string) { }
}
export class DeleteSuccess implements Action {
    readonly type = JobActionTypes.DeleteSuccess;
    constructor(public payload: any) { }
}
export class DeleteFail implements Action {
    readonly type = JobActionTypes.DeleteFail;
    constructor(public payload: any) { }
}

export class Update implements Action {
    readonly type = JobActionTypes.Update;
    constructor(public payload: any) { }
}
export class UpdateSuccess implements Action {
    readonly type = JobActionTypes.UpdateSuccess;
    constructor(public payload: any) { }
}
export class UpdateFail implements Action {
    readonly type = JobActionTypes.UpdateFail;
    constructor(public payload: any) { }
}

export type JobActions
    = Get
    | GetSuccess
    | GetFail
    | GetById
    | GetByIdSuccess
    | GetByIdFail
    | Add
    | AddSuccess
    | AddFail
    | Delete
    | DeleteSuccess
    | DeleteFail
    | Update
    | UpdateSuccess
    | UpdateFail;
