import {clientModuleFeatureKey, ClientModuleState} from '../../client/store';
import {adminModuleFeatureKey, AdminModuleState} from '../../admin/store';


export interface State {
  [clientModuleFeatureKey]: ClientModuleState;
  [adminModuleFeatureKey]: AdminModuleState;
}
