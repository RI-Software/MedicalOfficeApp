import {Client} from '../../../shared/models/Client';
import {ActionStatusesEnum} from './ActionStatusesEnum';

export interface ClientState {
  client: Client;
  registerStatus: ActionStatusesEnum;
  preregisterStatus: ActionStatusesEnum;
}
