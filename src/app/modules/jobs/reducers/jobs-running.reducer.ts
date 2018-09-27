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
            return { ...state, running: action.payload };
        }
        case JobsRunningActionTypes.AddRunning: {
            return { ...state, running: state.running + 1 }
        }
        case JobsRunningActionTypes.DeleteRunning: {
            return { ...state, running: state.running - 1 }
        }

        default: {
            return state;
        }
    }
}