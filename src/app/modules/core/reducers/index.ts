import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { RouterStateSerializer } from '@ngrx/router-store';

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
    router: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<MistState> = {
    router: fromRouter.routerReducer
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