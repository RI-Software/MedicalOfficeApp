import { createAction, props } from '@ngrx/store';
import {Client} from '../../../../shared/models/Client';
import {ActionStatusesEnum} from '../../../shared/models/ActionStatusesEnum';

export const clientRegister = createAction(
  '[Client] Register Client'
);

export const clientRegisterStatus = createAction(
  '[Client] Set Register Client Status',
  props<{registerStatus: ActionStatusesEnum}>()
);

export const clientPreregister = createAction(
  '[Client] Preregister Client',
  props<{selectedDate: Date, selectedTime: string}>()
);

export const clientPreregisterStatus = createAction(
  '[Client] Set Preregister Client Status',
  props<{preregisterStatus: ActionStatusesEnum}>()
);

export const setClient = createAction(
  '[Client] Set Client',
  props<{client: Client}>()
);
