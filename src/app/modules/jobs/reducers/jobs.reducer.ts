import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Job } from '@shared/models';
import { JobActions, JobActionTypes } from '@jobs/actions';

export interface State extends EntityState<Job> { }

export const adapter: EntityAdapter<Job> = createEntityAdapter<Job>({
    selectId: (job: Job) => job.jobId,
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: JobActions): State {
    switch (action.type) {
        case JobActionTypes.GetSuccess: {
            return adapter.addAll(action.payload, state);
        }
        case JobActionTypes.GetByIdSuccess: {
            return adapter.addOne(action.payload, state);
        }
        case JobActionTypes.AddSuccess: {
            console.log(action.payload);
            return adapter.addOne(action.payload, state);
        }
        case JobActionTypes.UpdateSuccess: {
            return adapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state);
        }

        default: {
            return state;
        }
    }
}
