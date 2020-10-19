import {createAction, props} from '@ngrx/store';
import {AvailableDate, AvailableTime} from '../../../shared/models/Date&Times';


export const nextBtnAvailability = createAction(
  '[Steps Logic] Enable Next Btn',
  props<{ isAvailable: boolean }>()
);

export const backBtnAvailability = createAction(
  '[Steps Logic] Enable Back Btn',
  props<{ isAvailable: boolean }>()
);

export const stepBtnPressStatus = createAction(
  '[Step Logic] Press Step Btn',
  props<{ isPressed: boolean }>()
);

export const step = createAction(
  '[Steps Logic] Perform Step',
  props<{ path: string }>()
);

export const getAvailableDates = createAction(
  '[Steps Logic] Get Available Dates'
);

export const getAvailableDatesSucceed = createAction(
  '[Steps Logic] Get Available Dates Succeed'
);

export const getAvailableDatesFailed = createAction(
  '[Steps Logic] Get Available Dates Failed'
);

export const setAvailableDates = createAction(
  '[Steps Logic] Set Available Dates',
  props<{ availableDates: AvailableDate[] }>()
);

export const getAvailableTime = createAction(
  '[Steps Logic] Get Available Time',
  props<{ date: Date }>()
);

export const getAvailableTimeSucceed = createAction(
  '[Steps Logic] Get Available Time Succeed'
);

export const getAvailableTimeFailed = createAction(
  '[Steps Logic] Get Available Time Failed'
);

export const setAvailableTime = createAction(
  '[Steps Logic] Set Available Time',
  props<{ availableTime: AvailableTime[] }>()
);
