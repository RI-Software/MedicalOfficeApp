import {SharedState} from '../reducers/shared.reducer';
import {createSelector} from '@ngrx/store';
import {sharedModuleFeatureKey} from '../index';
import {State} from '../../models/State';

export const selectSharedState = (state: State) => state[sharedModuleFeatureKey].shared;

export const selectCurrentLanguage = createSelector(
  selectSharedState,
  (state: SharedState) => state.language
);
