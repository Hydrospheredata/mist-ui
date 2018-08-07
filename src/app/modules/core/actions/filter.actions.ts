import { Action } from '@ngrx/store';
import { Filter } from '@app/modules/shared/models';

export enum FilterActionTypes {
    GetFilter = '[Filter] Get filter options',
    SetFilter = '[Filter] Set filter options',
    SetFilterSuccess = '[Filter] Set filter options with success',
};

export class GetFilter implements Action {
    readonly type = FilterActionTypes.GetFilter;
}

export class SetFilter implements Action {
    readonly type = FilterActionTypes.SetFilter;

    constructor(public option: any) { }
}

export class SetFilterSuccess implements Action {
    readonly type = FilterActionTypes.SetFilterSuccess;

    constructor(public options: Filter) { }
}

export type FilterActions
    = GetFilter
    | SetFilter
    | SetFilterSuccess;
