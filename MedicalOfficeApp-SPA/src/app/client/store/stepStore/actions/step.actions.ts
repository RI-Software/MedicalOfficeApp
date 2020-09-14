import {createAction, props} from '@ngrx/store';


export const nextBtnAvailability = createAction(
  '[Steps Logic] Enable Next Btn',
  props<{isAvailable: boolean}>()
);

export const backBtnAvailability = createAction(
  '[Steps Logic] Enable Back Btn',
  props<{isAvailable: boolean}>()
);

export const stepBtnPressStatus = createAction(
  '[Step Logic] Press Step Btn',
  props<{isPressed: boolean}>()
);

export const step = createAction(
  '[Steps Logic] Perform Step',
  props<{path: string}>()
);
