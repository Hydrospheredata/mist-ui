import { Action } from '@ngrx/store';
import { Filter } from '@app/modules/shared/models';

export enum FilterActionTypes {
    SetFilter = '[Filter] Set filter options',
};

export class SetFilter implements Action {
    readonly type = FilterActionTypes.SetFilter;

    constructor(public options: Filter) { }
}

export type FilterActions
    = SetFilter;
