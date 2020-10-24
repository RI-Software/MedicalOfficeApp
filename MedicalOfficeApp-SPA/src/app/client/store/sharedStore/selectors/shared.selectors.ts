import {State} from '../../../../shared/models/State';
import {createSelector} from '@ngrx/store';
import {clientModuleFeatureKey} from '../../index';
import {ClientSharedState} from '../../../shared/models/ClientSharedState';

export const selectClientShared = (state: State) => state[clientModuleFeatureKey].shared;

export const selectIsMainLoaderOn = createSelector(
  selectClientShared,
  (state: ClientSharedState) => state.isMainLoaderOn
);

export const selectIsTimeLoaderOn = createSelector(
  selectClientShared,
  (state: ClientSharedState) => state.isTimeLoaderOn
);
