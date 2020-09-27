import {createSelector} from '@ngrx/store';
import {State} from '../../../../shared/models/State';
import {adminModuleFeatureKey} from '../../index';
import {AdminState} from '../../../shared/models/AdminState';

export const selectClientState = (state: State) => state[adminModuleFeatureKey].admin;

export const selectIsAdminLoggedIn = createSelector(
  selectClientState,
  (state: AdminState) => state.isLoggedIn
);
