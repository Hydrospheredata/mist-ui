import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Job } from '@app/modules/shared/models';
import { JobActions, JobActionTypes } from '@app/modules/jobs/actions';

export interface State extends EntityState<Job> {
    total: number,
}

export const adapter: EntityAdapter<Job> = createEntityAdapter<Job>({
    selectId: (job: Job) => job.jobId,
});

export const initialState: State = adapter.getInitialState({
    total: 0,
});

export function reducer(state = initialState, action: JobActions): State {
    switch (action.type) {
        case JobActionTypes.GetSuccess: {
            return adapter.addAll(action.payload.jobs, { ...state, total: action.payload.total });
        }
        case JobActionTypes.GetByIdSuccess: {
            return adapter.addOne(action.payload, state);
        }
        case JobActionTypes.Increment: {
            return { ...state, total: state.total + 1 };
        }
        case JobActionTypes.AddSuccess: {
            return adapter.addOne(action.payload, state);
        }
        // case JobActionTypes.AddFail: {
        //     return 
        // }
        case JobActionTypes.UpdateSuccess: {
            return adapter.updateOne({
                id: action.payload.jobId,
                changes: action.payload
            }, state);
        }

        default: {
            return state;
        }
    }
}
