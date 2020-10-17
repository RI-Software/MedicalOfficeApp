import { createSelector } from '@ngrx/store';
import { State } from '../../../../shared/models/State';
import { adminModuleFeatureKey } from '../../index';
import { RecordsState } from '../../../shared/models/RecordState';

export const selectClientState = (state: State) => state[adminModuleFeatureKey].records;

export const selectRecords = createSelector(
  selectClientState,
  (state: RecordsState) => state.records
);

export const selectIdsAcceptBtnLoaderIsOn = createSelector(
  selectClientState,
  (state: RecordsState) => state.acceptBtnLoaderIsOnIds
);

export const selectIdsDeleteBtnLoaderIsOn = createSelector(
  selectClientState,
  (state: RecordsState) => state.deleteBtnLoaderIsOnIds
);

export const selectRecordsSettings = createSelector(
  selectClientState,
  (state: RecordsState) => state.recordsSettings
);
