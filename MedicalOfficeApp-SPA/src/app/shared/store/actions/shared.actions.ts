import {createAction, props} from '@ngrx/store';

export const setLanguage = createAction(
  '[App] Set Current Language',
  props<{ language: string }>()
);
