import {ActionReducerMap} from '@ngrx/store';
import * as fromRecords from '../store/recordsStore/reducers/records.reducers';
import * as fromAdmin from '../store/adminStore/reducers/admin.reducer';
import {RecordsState} from '../shared/models/RecordState';
import {AdminState} from '../shared/models/AdminState';

export const adminModuleFeatureKey = 'adminStore';

export interface AdminModuleState {
  records: RecordsState;
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminModuleState> = {
  records: fromRecords.reducer,
  admin: fromAdmin.reducer
};
