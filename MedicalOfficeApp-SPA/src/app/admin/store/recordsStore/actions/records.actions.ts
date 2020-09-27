import {createAction, props} from '@ngrx/store';
import {Record} from '../../../shared/models/Record';
import {ApiResult} from '../../../shared/models/ApiResult';

export const seedRecords = createAction(
  '[Records] Get Records',
  props<{
    pageSize?: number,
    pageIndex?: number,
    sortColumns?: string[],
    sortOrder?: string
  }>()
);

export const setRecords = createAction(
  '[Records] Set Records',
  props<{records: ApiResult<Record>}>()
);
