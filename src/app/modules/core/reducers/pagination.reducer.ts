import { PaginationActions, PaginationActionTypes } from '@app/modules/core/actions';
import { EntityState } from "@ngrx/entity";

export interface State {
    current: number
};

const initialState: State = {
    current: 0
};

export function reducer(state = initialState, action: PaginationActions): State {
    switch (action.type) {
        case PaginationActionTypes.Forward:
        case PaginationActionTypes.Backward:
        case PaginationActionTypes.GoTo: {
            return { ...state, current: action.options.current };
        }

        default: {
            return state;
        }
    }
}