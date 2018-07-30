import * as fromRoot from '@app/modules/core/reducers';
import * as fromFunctions from '@app/modules/functions/reducers/functions.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Function } from '@app/modules/shared/models';

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

export const getFirstFunctionFromList = createSelector(
    getAllFunctions,
    (functions): Function => functions.length ? functions[0] : null
);