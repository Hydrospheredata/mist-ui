import { Action } from '@ngrx/store';

export enum WorkersActionTypes {
    Get = '[Workers] Get list of all workers',
    GetSuccess = '[Workers] Get list of all workers with success',
    GetFail = '[Workers] Get list of all workers with fail',
    Delete = '[Workers] Delete worker',
    DeleteSuccess = '[Workers] Delete worker with success'
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

    constructor(public payload: any) { }
}

export class DeleteSuccess implements Action {
    readonly type = WorkersActionTypes.DeleteSuccess;

    constructor(public payload: any) { }
}

export type WorkersActions
    = Get
    | GetSuccess
    | GetFail
    | Delete
    | DeleteSuccess;
