import {ActionReducerMap, createSelector} from '@ngrx/store';
import {ClientState} from '../shared/models/ClientState';
import {StepState} from '../shared/models/StepState';
import * as fromClient from './clientStore/reducers/client.reducer';
import * as fromSteps from './stepStore/reducers/step.reducer';

export const clientModuleFeatureKey = 'clientStore';

export interface ClientModuleState {
  client: ClientState;
  step: StepState;
}

export const reducers: ActionReducerMap<ClientModuleState> = {
  client: fromClient.reducer,
  step: fromSteps.reducer
};
