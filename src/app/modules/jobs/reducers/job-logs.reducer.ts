import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { JobLogs } from '@app/modules/shared/models';
import { JobLogsActions, JobLogsActionTypes } from '@app/modules/jobs/actions';

export interface State {
    logs: string[];
    loading: boolean;
};

const initialState: State = {
    logs: [],
    loading: false
};

export function reducer(state = initialState, action: JobLogsActions): State {
    switch (action.type) {
        case JobLogsActionTypes.GetLogs: {
            return { ...state, loading: true }
        }
        case JobLogsActionTypes.GetLogsSuccess: {
            return {
                ...state,
                logs: action.payload,
                loading: false
            }
        }

        default: {
            return state;
        }
    }
}