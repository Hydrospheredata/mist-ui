import { ActionReducerMap, createFeatureSelector, MetaReducer, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { RouterStateSerializer } from '@ngrx/router-store';
import * as fromContext from './context.reducer';
import * as fromPagination from './pagination.reducer';
import * as fromFilter from './filter.reducer';
import { getJobsTotal } from '@jobs/reducers';

export interface RouterStateUrl {
    url: string;
    params: Params,
    queryParams: Params
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const { url, root: { queryParams } } = routerState;
        const { params } = route;

        return { url, params, queryParams };
    }
}

export interface MistState {
    router: fromRouter.RouterReducerState<RouterStateUrl>,
    context: fromContext.State,
    pagination: fromPagination.State,
    filter: fromFilter.State,
}

export const reducers: ActionReducerMap<MistState> = {
    router: fromRouter.routerReducer,
    context: fromContext.reducer,
    pagination: fromPagination.reducer,
    filter: fromFilter.reducer,
}

export const defaultRouterState = {
    initialState: {
        router: {
            "state": {
                "url": "/",
                "params": {},
                "queryParams": {}
            },
            "navigationId": 0
        }
    }
}

export const metaReducers: MetaReducer<MistState>[] = !environment.production
    ? []
    : []

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const getContextState = createFeatureSelector<fromContext.State>('context');

export const getPaginationState = createFeatureSelector<fromPagination.State>('pagination');

export const getFilterState = createFeatureSelector<fromFilter.State>('filter');

export const getPaginationCurrent = createSelector(getPaginationState, state => state.current);

export const getContextEntitiesState = createSelector(getContextState, state => state);

export const {
    selectEntities: getContextEntities,
    selectAll: getAllContexts,
    selectTotal: getTotalContexts,
} = fromContext.adapter.getSelectors(getContextEntitiesState);

export const getFilterOptions = createSelector(
    getFilterState,
    state => state
)

export const getRouterParams = createSelector(
    getRouterState,
    router => router.state && router.state.params
)
