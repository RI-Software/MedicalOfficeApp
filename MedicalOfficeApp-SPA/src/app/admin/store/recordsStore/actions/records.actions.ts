import {createAction, props} from '@ngrx/store';
import {Record} from '../../../shared/models/Record';
import {ApiResult} from '../../../shared/models/ApiResult';
import {WhereStatement} from '../../../shared/models/WhereStatement';

export const getRecords = createAction(
  '[Records] Get Records',
  props<{
    pageSize?: number,
    pageIndex?: number,
    whereStatements?: WhereStatement[],
    sortColumns?: string[],
    sortOrder?: string
  }>()
);

export const getRecordsFailed = createAction(
  '[Records] Get Records Failed'
);

export const getRecord = createAction(
  '[Records] Get Record',
  props<{ recordId: number }>()
);

export const getRecordSucceed = createAction(
  '[Records] Get Record Succeed',
  props<{ record: Record }>()
);

export const getRecordFailed = createAction(
  '[Records] Get Record Failed',
  props<{ recordId: number }>()
);

export const acceptRecord = createAction(
  '[Records] Accept Record',
  props<{ recordId: number }>()
);

export const deleteRecord = createAction(
  '[Records] Delete Record',
  props<{ recordId: number }>()
);

export const performDeleteRecordRequest = createAction(
  '[Records] Perform Delete Record Request',
  props<{ recordId: number }>()
);

export const deleteRecordSucceed = createAction(
  '[Records] Delete Record Succeed',
  props<{ recordId: number }>()
);

export const deleteRecordFailed = createAction(
  '[Records] Delete Record Failed',
  props<{ recordId: number }>()
);

export const setRecords = createAction(
  '[Records] Set Records',
  props<{ records: ApiResult<Record> }>()
);

export const setRecord = createAction(
  '[Records] Set Record',
  props<{ record: Record }>()
);

export const setRecordSucceed = createAction(
  '[Records] Set Record Succeed',
  props<{ recordId: number }>()
);

export const setRecordStatus = createAction(
  '[Records] Set Record Status',
  props<{ recordId: number, status: string }>()
);

export const setRecordStatusFailed = createAction(
  '[Records] On Set Record Status Failed',
  props<{ recordId: number }>()
);

export const setIdsAcceptBtnLoaderIsOn = createAction(
  '[Records] Set Ids Accept Btn Loader Is On',
  props<{ recordIds: number[] }>()
);

export const setIdsDeleteBtnLoaderIsOn = createAction(
  '[Records] Set Ids Delete Btn Loader Is On',
  props<{ recordIds: number[] }>()
);

export const turnOnAcceptBtnLoader = createAction(
  '[Records] Turn On Accept Btn Loader',
  props<{ recordId: number }>()
);

export const turnOffAcceptBtnLoader = createAction(
  '[Records] Turn Off Accept Btn Loader',
  props<{ recordId: number }>()
);

export const displaySucceedMessage = createAction(
  '[Records] Display Succeed Message',
  props<{ notificationText: string }>()
);
