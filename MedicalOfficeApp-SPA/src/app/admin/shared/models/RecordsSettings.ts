import {WhereStatement} from './WhereStatement';

export interface RecordsSettings {
  pageIndex: number;
  pageSize: number;
  whereStatements: WhereStatement[];
  sortColumns: string[];
  sortOrder: string;
}
