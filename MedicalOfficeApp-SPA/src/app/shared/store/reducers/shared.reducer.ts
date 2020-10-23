import {Action, createReducer, on} from '@ngrx/store';
import {setLanguage} from '../actions/shared.actions';

export interface SharedState {
  language: string;
}

export const initialState: SharedState = {
 language: 'en'
};

const sharedReducer = createReducer(
  initialState,
  on(setLanguage, (state, {language}) => ({...state, language})),
);

export function reducer(state: SharedState | undefined, action: Action) {
  return sharedReducer(state, action);
}
