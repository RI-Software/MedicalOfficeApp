import { createSelector } from '@ngrx/store';
import { State } from '../../../../shared/models/State';
import { adminModuleFeatureKey } from '../../index';
import { RecordsState } from '../../../shared/models/RecordState';

export const selectClientState = (state: State) => state[adminModuleFeatureKey].records;

export const selectRecords = createSelector(
  selectClientState,
  (state: RecordsState) => state.records
);
