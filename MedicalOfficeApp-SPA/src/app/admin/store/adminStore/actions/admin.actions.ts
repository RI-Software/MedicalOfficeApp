import {createAction, props} from '@ngrx/store';

export const loginAdmin = createAction(
  '[Admin] Login Admin',
  props<{username: string, password: string}>()
);

export const setLoginStatus = createAction(
  '[Admin] Set Login Status',
  props<{status: boolean}>()
);

export const navigateAdmin = createAction(
  '[Admin] Navigate Admin',
  props<{path: string}>()
);

export const checkTokenValidity = createAction(
  '[Admin] Is Token Valid',
  props<{role: string}>()
);
