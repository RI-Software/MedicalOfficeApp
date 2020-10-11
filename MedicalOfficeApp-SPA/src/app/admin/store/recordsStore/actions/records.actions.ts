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

export const getRecord = createAction(
  '[Records] Get Record',
  props<{ recordId: number }>()
);

export const getRecordSucceed = createAction(
  '[Records] Get Record Succeed',
  props<{record: Record}>()
);

export const getRecordFailed = createAction(
  '[Records] Get Record Failed',
  props<{recordId: number}>()
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
  props<{recordId: number}>()
);

export const setRecordStatus = createAction(
  '[Records] Set Record Status',
  props<{ recordId: number, status: string }>()
);

export const setRecordStatusSucceed = createAction(
  '[Records] On Set Record Status Succeed',
  props<{ notificationText: string }>()
);

export const setRecordStatusFailed = createAction(
  '[Records] On Set Record Status Failed',
  props<{recordId: number}>()
);

export const setIdsBtnLoaderIsOn = createAction(
  '[Records] Set Ids Btn Loader Is On',
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

export const acceptRecord = createAction(
  '[Records] Accept Record',
  props<{ recordId: number }>()
);
