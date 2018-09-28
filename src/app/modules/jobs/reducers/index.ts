import { MistState, getRouterState } from '@app/modules/core/reducers';
import * as fromJobs from '@app/modules/jobs/reducers/jobs.reducer';
import * as fromJobsRunning from '@jobs/reducers/jobs-running.reducer';
import * as fromJobLogs from '@app/modules/jobs/reducers/job-logs.reducer';
import * as fromWorkers from '@app/modules/workers/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Job, Worker } from '@app/modules/shared/models';

export interface JobsState {
    jobs: fromJobs.State,
    jobLogs: fromJobLogs.State,
    jobsRunning: fromJobsRunning.State
}

export interface State extends MistState {
    jobs: JobsState
}

export const reducers: ActionReducerMap<JobsState> = {
    jobs: fromJobs.reducer,
    jobLogs: fromJobLogs.reducer,
    jobsRunning: fromJobsRunning.reducer
}

export const getJobsState = createFeatureSelector<JobsState>('jobs');

export const getJobEntitiesState = createSelector(
    getJobsState,
    state => state.jobs
);

export const getJobsTotal = createSelector(getJobEntitiesState, entities => entities.total);

export const getJobLogsEntitiesState = createSelector(
    getJobsState,
    state => state.jobLogs
);

export const getJobsRunningEntitiesState = createSelector(
    getJobsState,
    state => state.jobsRunning
);

export const getJobLogs = createSelector(
    getJobLogsEntitiesState,
    entities => entities.logs
)

export const getJobLogsIsLoading = createSelector(
    getJobLogsEntitiesState,
    entities => entities.loading
)

export const getJobsRunning = createSelector(
    getJobsRunningEntitiesState,
    entities => entities.running
)

export const {
    selectEntities: getJobEntities,
    selectAll: getAllJobs,
    selectTotal: getTotalJobs,
} = fromJobs.adapter.getSelectors(getJobEntitiesState);

export const getJobs = createSelector(
    getAllJobs,
    getRouterState,
    (jobs, router) => router.state && jobs.filter(job => {
        // ToDo: Fix that
        if (router.state.params.functionId === 'overview') {
            return job.functionId
        } else {
            return router.state.params.functionId === job.functionId
        }
    })
)

export const getSelectedJobId = createSelector(
    getRouterState,
    (router): string => router.state && router.state.params.jobId
);

export const getSelectedJob = createSelector(
    getJobEntities,
    getRouterState,
    (entities, router): Job => router.state && entities[router.state.params.jobId]
);

export const getParamsOfCurrentJob = createSelector(
    getSelectedJob,
    job => {
        console.log(job);
        return job && job.params.arguments
    }
);

export const getJobWorkerId = createSelector(
    getJobEntities,
    getRouterState,
    (entities, router): string => router.state && entities[router.state.params.jobId] && entities[router.state.params.jobId].workerId
);

export const getJobWorker = createSelector(
    getJobWorkerId,
    fromWorkers.getWorkerEntities,
    (workerId, workerEntities): Worker => workerEntities[workerId]
);

export const getCurrentWorkerJobs = createSelector(
    getJobEntities,
    getRouterState,
    (entities, router) => router.state && entities[router.state.params.workerId]
);

export const getStartedJobs = (functionId) => createSelector(
    getAllJobs,
    jobs => jobs.filter(job => job.functionId === functionId).length
)
