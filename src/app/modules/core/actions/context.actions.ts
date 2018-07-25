import { Action } from '@ngrx/store';
import { Context } from '@app/modules/shared/models';

export enum ContextActionTypes {
    GetContext = '[Context] Get context',
    GetContextSuccess = '[Context] Get context with success',
    GetContextFail = '[Context] Get context with fail',
    AddContext = '[Context] Add context',
    AddContextSuccess = '[Context] Add context with success',
    AddContextFail = '[Context] Add context with fail'
};

export class GetContext implements Action {
    readonly type = ContextActionTypes.GetContext;
}

export class GetContextSuccess implements Action {
    readonly type = ContextActionTypes.GetContextSuccess;

    constructor(public payload: any) { }
}

export class GetContextFail implements Action {
    readonly type = ContextActionTypes.GetContextFail;

    constructor(public payload: any) { }
}

export class AddContext implements Action {
    readonly type = ContextActionTypes.AddContext;
    constructor(public context: Context) { }
}

export class AddContextSuccess implements Action {
    readonly type = ContextActionTypes.AddContextSuccess;
    constructor(public context: Context) { }
}

export class AddContextFail implements Action {
    readonly type = ContextActionTypes.AddContextFail;
    constructor(public error) { }
}

export type ContextActions
    = GetContext
    | GetContextSuccess
    | GetContextFail
    | AddContext
    | AddContextSuccess
    | AddContextFail;
