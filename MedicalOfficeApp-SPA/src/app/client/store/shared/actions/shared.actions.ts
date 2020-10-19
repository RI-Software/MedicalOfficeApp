import {createAction} from '@ngrx/store';

export const showMainClientLoader = createAction(
  '[Loader] Show Main Client Loader'
);

export const hideMainClientLoader = createAction(
  '[Loader] Hide Main Client Loader'
);

export const showTimeBtnsLoader = createAction(
  '[Loader] Show Time Btns Loader'
);

export const hideTimeBtnsLoader = createAction(
  '[Loader] Hide Time Btns Loader'
);
