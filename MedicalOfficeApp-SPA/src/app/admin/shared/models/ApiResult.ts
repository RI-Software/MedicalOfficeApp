import {WhereStatement} from './WhereStatement';

export interface ApiResult<T> {
  data: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  whereStatements: WhereStatement[];
  sortColumns: string[];
  sortOrder: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
