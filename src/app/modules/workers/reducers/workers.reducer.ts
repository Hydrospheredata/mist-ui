import * as fromWorker from '@workers/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Worker } from '@shared/models';

export interface State extends EntityState<Worker> { };

export const adapter: EntityAdapter<Worker> = createEntityAdapter<Worker>({
    selectId: (worker: Worker) => worker.name
})

const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: fromWorker.WorkersActions): State {
    switch (action.type) {
        case fromWorker.WorkersActionTypes.GetSuccess: {
            return adapter.addAll(action.payload, state);
        }

        default: {
            return state;
        }
    }
}