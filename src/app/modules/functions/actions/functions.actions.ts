import { Action } from '@ngrx/store';
import { Function } from '@app/modules/shared/models';

export enum FunctionActionTypes {
    Get = '[Function] Get list of all functions',
    GetSuccess = '[Function] Get list of all functions with success',
    GetFail = '[Function] Get list of all functions with fail',
    Add = '[Function] Add function',
    AddSuccess = '[Function] Add function with success',
    AddFail = '[Function] Add function with fail',
    Update = '[Function] Update function',
    UpdateSuccess = '[Function] Update function with success',
    UpdateFail = '[Function] Update function with fail',
};

export class Get implements Action {
    readonly type = FunctionActionTypes.Get;
}
export class GetSuccess implements Action {
    readonly type = FunctionActionTypes.GetSuccess;
    constructor(public payload: Function[]) { }
}
export class GetFail implements Action {
    readonly type = FunctionActionTypes.GetFail;
    constructor(public error: any) { }
}
export class Add implements Action {
    readonly type = FunctionActionTypes.Add;
    constructor(public payload: any) { }
}
export class AddSuccess implements Action {
    readonly type = FunctionActionTypes.AddSuccess;
    constructor(public payload: any) { }
}
export class AddFail implements Action {
    readonly type = FunctionActionTypes.AddFail;
    constructor(public payload: any) { }
}
export class Update implements Action {
    readonly type = FunctionActionTypes.Update;
    constructor(public payload: any) { }
}
export class UpdateSuccess implements Action {
    readonly type = FunctionActionTypes.UpdateSuccess;
    constructor(public payload: any) { }
}
export class UpdateFail implements Action {
    readonly type = FunctionActionTypes.UpdateFail;
    constructor(public payload: any) { }
}

export type FunctionActions
    = Get
    | GetSuccess
    | GetFail
    | Add
    | AddSuccess
    | AddFail
    | Update
    | UpdateSuccess
    | UpdateFail;
