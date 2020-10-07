import {createAction, props} from '@ngrx/store';
import {Record} from '../../../shared/models/Record';
import {ApiResult} from '../../../shared/models/ApiResult';
import {WhereStatement} from '../../../shared/models/WhereStatement';

export const seedRecords = createAction(
  '[Records] Get Records',
  props<{
    pageSize?: number,
    pageIndex?: number,
    whereStatements?: WhereStatement[],
    sortColumns?: string[],
    sortOrder?: string
  }>()
);

export const setRecords = createAction(
  '[Records] Set Records',
  props<{records: ApiResult<Record>}>()
);
