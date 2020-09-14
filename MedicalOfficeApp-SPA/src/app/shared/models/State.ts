import {clientModuleFeatureKey, ClientModuleState} from '../../client/store';


export interface State {
  [clientModuleFeatureKey]: ClientModuleState;
}
