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
            return adapter.addOne(action.payload, state);
        }
        case JobActionTypes.UpdateSuccess: {
            return adapter.updateOne({
                id: action.payload.jobId,
                changes: {
                    status: action.payload.status ? action.payload.status : undefined,
                    startTime: action.payload.startTime ? action.payload.startTime : undefined,
                    createTime: action.payload.createTime ? action.payload.createTime : undefined,
                    params: action.payload.params ? action.payload.params : undefined,
                    workerId: action.payload.workerId ? action.payload.workerId : undefined,
                }
            }, state);
        }

        default: {
            return state;
        }
    }
}
