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

        case PaginationActionTypes.SetCurrent: {
            return { ...state, current: action.current }
        }

        default: {
            return state;
        }
    }
}