import {Action, createReducer, on} from '@ngrx/store';
import * as ClientActions from '../actions/client.actions';
import {ActionStatusesEnum} from '../../../shared/models/ActionStatusesEnum';
import {ClientState} from '../../../shared/models/ClientState';


const initialState: ClientState = {
  client: null,
  preregisterStatus: ActionStatusesEnum.Default,
  registerStatus: ActionStatusesEnum.Default,
};

const clientReducer = createReducer(
  initialState,
  on(ClientActions.clientRegisterStatus, (state, {registerStatus}) => ({...state, registerStatus})),
  on(ClientActions.clientPreregisterStatus, (state, {preregisterStatus}) => ({...state, preregisterStatus})),
  on(ClientActions.setClient, (state, {client}) => ({...state, client}))
);

export function reducer(state: ClientState | undefined, action: Action) {
  return clientReducer(state, action);
}
