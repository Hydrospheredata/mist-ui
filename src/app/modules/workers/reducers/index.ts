import * as fromRoot from '@app/modules/core/reducers';
import * as fromWorkers from '@app/modules/workers/reducers/workers.reducer';
import * as fromWorkerJobs from '@app/modules/workers/reducers/worker-jobs.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Worker } from '@app/modules/shared/models';

export interface WorkersState {
    workers: fromWorkers.State,
    jobs: fromWorkerJobs.State
}

export interface State extends fromRoot.MistState {
    workers: WorkersState
}

export const reducers: ActionReducerMap<WorkersState> = {
    workers: fromWorkers.reducer,
    jobs: fromWorkerJobs.reducer,
}

export const getWorkersState = createFeatureSelector<WorkersState>('workers');

export const getWorkerEntitiesState = createSelector(
    getWorkersState,
    state => state.workers
);

export const getWorkerJobEntitiesState = createSelector(
    getWorkersState,
    state => state.jobs
);

export const {
    selectEntities: getWorkerEntities,
    selectAll: getAllWorkers,
    selectTotal: getTotalWorkers,
} = fromWorkers.adapter.getSelectors(getWorkerEntitiesState);

export const {
    selectEntities: getWorkerJobEntities,
    selectAll: getAllWorkerJobs,
    selectTotal: getTotalWorkerJobs,
} = fromWorkerJobs.adapter.getSelectors(getWorkerJobEntitiesState);

export const getCurrentWorker = createSelector(
    getWorkerEntities,
    fromRoot.getRouterState,
    (entities, router): Worker => router.state && entities[router.state.params.workerId]
)

export const getCurrentWorkerId = createSelector(
    getCurrentWorker,
    (worker: Worker): string => worker && worker.name
)

export const getJobCurrentWorker = createSelector(
    getWorkerEntities,
    fromRoot.getRouterState,
    (entities, router): Worker => router.state && entities[router.state.params.workerId]
)
