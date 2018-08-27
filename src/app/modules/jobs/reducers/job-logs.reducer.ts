import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { JobLogs } from '@app/modules/shared/models';
import { JobLogsActions, JobLogsActionTypes } from '@app/modules/jobs/actions';

// export interface State {
//     logs: string[]
// };

const initialState: string[] = [];

export function reducer(state = initialState, action: JobLogsActions): string[] {
    switch (action.type) {
        case JobLogsActionTypes.GetLogsSuccess: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}