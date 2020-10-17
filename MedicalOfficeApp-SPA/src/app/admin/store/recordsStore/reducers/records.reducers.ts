import {RecordsState} from '../../../shared/models/RecordState';
import {Action, createReducer, on} from '@ngrx/store';
import * as RecordActions from '../actions/records.actions';

const initialState: RecordsState = {
  records: null,
  recordsSettings: {
    pageIndex: null,
    pageSize: null,
    whereStatements: null,
    sortColumns: null,
    sortOrder: null,
  },
  acceptBtnLoaderIsOnIds: [],
  deleteBtnLoaderIsOnIds: []
};

const recordsReducer = createReducer(
  initialState,
  on(RecordActions.setRecords, (state, {records}) => ({...state, records})),
  on(RecordActions.setIdsAcceptBtnLoaderIsOn, (state, {recordIds}) => ({...state, acceptBtnLoaderIsOnIds: recordIds})),
  on(RecordActions.setIdsDeleteBtnLoaderIsOn, (state, {recordIds}) => ({...state, deleteBtnLoaderIsOnIds: recordIds})),
  on(RecordActions.setPageIndex, (state, {pageIndex}) => (
    {
      ...state,
      recordsSettings: {
        ...state.recordsSettings,
        pageIndex
      }
    }
  )),
  on(RecordActions.setPageSize, (state, {pageSize}) => (
    {
      ...state,
      recordsSettings: {
        ...state.recordsSettings,
        pageSize
      }
    }
  )),
  on(RecordActions.setWhereStatements, (state, {whereStatements}) => (
    {
      ...state,
      recordsSettings: {
        ...state.recordsSettings,
        whereStatements
      }
    }
  )),
  on(RecordActions.setSortColumns, (state, {sortColumns}) => (
    {
      ...state,
      recordsSettings: {
        ...state.recordsSettings,
        sortColumns
      }
    }
  )),
  on(RecordActions.setSortOrder, (state, {sortOrder}) => (
    {
      ...state,
      recordsSettings: {
        ...state.recordsSettings,
        sortOrder
      }
    }
  )),
  on(RecordActions.resetRecordsSettings, (state) => ({...state, recordsSettings: initialState.recordsSettings}))
);

export function reducer(state: RecordsState | undefined, action: Action) {
  return recordsReducer(state, action);
}
