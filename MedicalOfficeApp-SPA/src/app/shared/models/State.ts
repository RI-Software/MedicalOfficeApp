import {clientModuleFeatureKey, ClientModuleState} from '../../client/store';
import {adminModuleFeatureKey, AdminModuleState} from '../../admin/store';
import {sharedModuleFeatureKey, SharedModuleState} from '../store';

export interface State {
  [sharedModuleFeatureKey]: SharedModuleState;
  [clientModuleFeatureKey]: ClientModuleState;
  [adminModuleFeatureKey]: AdminModuleState;
}
