import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = { routerReducer };

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const url = routerState.url;
    const queryParams = routerState.root.queryParams;

    let state: ActivatedRouteSnapshot = routerState.root;
    while(state.firstChild) {
      state = state.firstChild;
    }
    const params = state.params;

    return { url, queryParams, params };
  }
}
