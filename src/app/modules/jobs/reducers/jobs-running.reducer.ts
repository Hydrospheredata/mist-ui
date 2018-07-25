import { JobsRunningActions, JobsRunningActionTypes } from '@app/modules/jobs/actions';

export interface State {
    running: number;
};

const initialState: State = {
    running: 0,
};

export function reducer(state = initialState, action: JobsRunningActions): State {
    switch (action.type) {
        case JobsRunningActionTypes.GetRunningSuccess: {
            console.log({ running: action.payload, ...state })
            return { running: action.payload, ...state };
        }

        default: {
            return state;
        }
    }
}