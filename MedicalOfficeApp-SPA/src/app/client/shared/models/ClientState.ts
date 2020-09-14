import {Client} from './Client';
import {ActionStatusesEnum} from './ActionStatusesEnum';

export interface ClientState {
  client: Client;
  registerStatus: ActionStatusesEnum;
  preregisterStatus: ActionStatusesEnum;
}
