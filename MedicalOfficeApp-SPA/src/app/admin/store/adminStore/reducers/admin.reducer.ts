import {Action, createReducer, on} from '@ngrx/store';
import {AdminState} from '../../../shared/models/AdminState';
import {setLoginStatus} from '../actions/admin.actions';

export const initialState: AdminState = {
  isLoggedIn: false
};

const adminReducer = createReducer(
  initialState,
  on(setLoginStatus, (state, {status}) => ({...state, isLoggedIn: status}))
);

export function reducer(state: AdminState | undefined, action: Action) {
  return adminReducer(state, action);
}
