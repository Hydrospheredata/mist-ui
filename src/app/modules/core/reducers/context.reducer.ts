import { ContextActions, ContextActionTypes } from '@app/modules/core/actions';

export interface State {

};

const initialState: State = {

};

export function reducer(state = initialState, action: ContextActions): State {
    switch (action.type) {
        case ContextActionTypes.GetContextSuccess: {
            return state;
        }

        default: {
            return state;
        }
    }
}