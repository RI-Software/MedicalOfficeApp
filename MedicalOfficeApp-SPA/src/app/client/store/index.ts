import {ActionReducerMap} from '@ngrx/store';
import {ClientState} from '../shared/models/ClientState';
import {StepState} from '../shared/models/StepState';
import * as fromClient from './clientStore/reducers/client.reducer';
import * as fromSteps from './stepStore/reducers/step.reducer';
import * as fromClientShared from './sharedStore/reducers/shared.reducer';

import {ClientSharedState} from '../shared/models/ClientSharedState';

export const clientModuleFeatureKey = 'clientStore';

export interface ClientModuleState {
  client: ClientState;
  step: StepState;
  shared: ClientSharedState;
}

export const reducers: ActionReducerMap<ClientModuleState> = {
  client: fromClient.reducer,
  step: fromSteps.reducer,
  shared: fromClientShared.reducer
};
