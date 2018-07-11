import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { JobLogs } from '@shared/models';
import { JobLogsActions, JobLogsActionTypes } from '@jobs/actions';

export interface State extends EntityState<JobLogs> { };

export const adapter: EntityAdapter<JobLogs> = createEntityAdapter<JobLogs>()

const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: JobLogsActions): State {
    switch (action.type) {
        case JobLogsActionTypes.GetLogsSuccess: {
            return adapter.addAll(action.payload, state);
        }

        default: {
            return state;
        }
    }
}