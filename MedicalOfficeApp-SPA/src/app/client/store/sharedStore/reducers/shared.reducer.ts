import {createReducer, on, Action} from '@ngrx/store';
import * as ClientSharedActions from '../actions/shared.actions';
import {ClientSharedState} from '../../../shared/models/ClientSharedState';


const initialState: ClientSharedState = {
  isMainLoaderOn: false,
  isTimeLoaderOn: false
};

const sharedReducer = createReducer(
  initialState,
  on(ClientSharedActions.setMainLoaderStatus, (state, {isOn}) => ({...state, isMainLoaderOn: isOn})),
  on(ClientSharedActions.setTimeLoaderStatus, (state, {isOn}) => ({...state, isTimeLoaderOn: isOn}))
);

export function reducer(state: ClientSharedState | undefined, action: Action) {
  return sharedReducer(state, action);
}
