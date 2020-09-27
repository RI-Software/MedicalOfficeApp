export interface ApiResult<T> {
  data: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  sortColumns: string[];
  sortOrder: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
