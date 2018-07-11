import * as fromRoot from '@core/reducers';
import * as fromFunctions from './functions.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Function } from '@shared/models';

export interface FunctionsState {
    functions: fromFunctions.State
}

export interface State extends fromRoot.MistState {
    functions: FunctionsState
}

export const reducers: ActionReducerMap<FunctionsState> = {
    functions: fromFunctions.reducer
}

export const getFunctionsState = createFeatureSelector<FunctionsState>('functions');

export const getFunctionEntitiesState = createSelector(
    getFunctionsState,
    state => state.functions
);

export const {
    selectEntities: getFunctionEntities,
    selectAll: getAllFunctions,
    selectTotal: getTotalFunctions,
} = fromFunctions.adapter.getSelectors(getFunctionEntitiesState);

export const getSelectedFunction = createSelector(
    getFunctionEntities,
    fromRoot.getRouterState,
    (entities, router): Function => router.state && entities[router.state.params.functionId]
);