import * as fromRoot from '@app/modules/core/reducers';
import * as fromWorkers from '@app/modules/workers/reducers/workers.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Worker } from '@app/modules/shared/models';

export interface WorkersState {
    workers: fromWorkers.State
}

export interface State extends fromRoot.MistState {
    workers: WorkersState
}

export const reducers: ActionReducerMap<WorkersState> = {
    workers: fromWorkers.reducer
}

export const getWorkersState = createFeatureSelector<WorkersState>('workers');

export const getWorkerEntitiesState = createSelector(
    getWorkersState,
    state => state.workers
);

export const {
    selectEntities: getWorkerEntities,
    selectAll: getAllWorkers,
    selectTotal: getTotalWorkers,
} = fromWorkers.adapter.getSelectors(getWorkerEntitiesState);

export const getCurrentWorker = createSelector(
    getWorkerEntities,
    fromRoot.getRouterState,
    (entities, router): Worker => router.state && entities[router.state.params.workerId]
)

export const getJobCurrentWorker = createSelector(
    getWorkerEntities,
    fromRoot.getRouterState,
    (entities, router): Worker => router.state && entities[router.state.params.workerId]
)
