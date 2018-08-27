import * as fromWorker from '@app/modules/workers/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Job } from '@shared/models';

export interface State extends EntityState<Job> { };

export const adapter: EntityAdapter<Job> = createEntityAdapter<Job>({
    selectId: (job: Job) => job.jobId,
});

export const initialState: State = adapter.getInitialState();


export function reducer(state = initialState, action: fromWorker.WorkersActions): State {
    switch (action.type) {
        case fromWorker.WorkersActionTypes.GetJobsForWorkerSuccess: {
            return adapter.addAll(action.jobs, state);
        }

        default: {
            return state;
        }
    }
}