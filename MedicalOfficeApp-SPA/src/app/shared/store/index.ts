import {ActionReducerMap} from '@ngrx/store';
import * as fromApp from './reducers/shared.reducer';
import {SharedState} from './reducers/shared.reducer';

export const sharedModuleFeatureKey = 'appStore';

export interface SharedModuleState {
  shared: SharedState;
}

export const reducers: ActionReducerMap<SharedModuleState> = {
  shared: fromApp.reducer
};
