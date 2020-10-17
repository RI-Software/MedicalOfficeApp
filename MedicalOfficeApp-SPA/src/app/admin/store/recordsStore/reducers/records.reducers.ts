import {RecordsState} from '../../../shared/models/RecordState';
import {Action, createReducer, on} from '@ngrx/store';
import * as RecordActions from '../actions/records.actions';

const initialState: RecordsState = {
  records: null,
  acceptBtnLoaderIsOnIds: [],
  deleteBtnLoaderIsOnIds: []
};

const recordsReducer = createReducer(
  initialState,
  on(RecordActions.setRecords, (state, {records}) => ({...state, records})),
  on(RecordActions.setIdsAcceptBtnLoaderIsOn, (state, {recordIds}) => ({...state, acceptBtnLoaderIsOnIds: recordIds})),
  on(RecordActions.setIdsDeleteBtnLoaderIsOn, (state, {recordIds}) => ({...state, deleteBtnLoaderIsOnIds: recordIds}))
);

export function reducer(state: RecordsState | undefined, action: Action) {
  return recordsReducer(state, action);
}
