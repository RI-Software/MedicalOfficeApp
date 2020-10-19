import {createAction} from '@ngrx/store';

export const showMainClientLoader = createAction(
  '[Loader] Show Main Client Loader'
);

export const hideMainClientLoader = createAction(
  '[Loader] Hide Main Client Loader'
);
