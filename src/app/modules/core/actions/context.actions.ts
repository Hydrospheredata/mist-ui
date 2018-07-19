import { Action } from '@ngrx/store';

export enum ContextActionTypes {
    GetContext = '[Context] Get context',
    GetContextSuccess = '[Context] Get context with success',
    GetContextFail = '[Context] Get context with fail',
};

export class GetContext implements Action {
    readonly type = ContextActionTypes.GetContext;

    constructor(public payload: any) { }
}

export class GetContextSuccess implements Action {
    readonly type = ContextActionTypes.GetContextSuccess;

    constructor(public payload: any) { }
}

export class GetContextFail implements Action {
    readonly type = ContextActionTypes.GetContextFail;

    constructor(public payload: any) { }
}

export type ContextActions
    = GetContext
    | GetContextSuccess
    | GetContextFail;
