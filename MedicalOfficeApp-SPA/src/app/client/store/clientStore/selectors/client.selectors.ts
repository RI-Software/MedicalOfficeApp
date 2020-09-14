import {State} from '../../../../shared/models/State';
import {clientModuleFeatureKey} from '../../index';
import {createSelector} from '@ngrx/store';
import {ClientState} from '../../../shared/models/ClientState';

export const selectClientState = (state: State) => state[clientModuleFeatureKey].client;

export const selectClient = createSelector(
  selectClientState,
  (state: ClientState) => state.client
);

export const selectPreregisterStatus = createSelector(
  selectClientState,
  (state: ClientState) => state.preregisterStatus
);

export const selectRegisterStatus = createSelector(
  selectClientState,
  (state: ClientState) => state.registerStatus
);
