import { FilterActions, FilterActionTypes } from '@core/actions';
import { Filter } from '@app/modules/shared/models';

export interface State extends Filter { };

const initialState: State = {
    success: true,
    running: true,
    failed: true,
};

export function reducer(state = initialState, action: FilterActions): State {
    switch (action.type) {
        case FilterActionTypes.SetFilterSuccess: {
            return { ...state, ...action.options };
        }

        default: {
            return state;
        }
    }
}