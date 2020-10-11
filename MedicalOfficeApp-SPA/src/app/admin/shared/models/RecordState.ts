import { Record } from './Record';
import {ApiResult} from './ApiResult';

export interface RecordsState {
  records: ApiResult<Record>;
  acceptBtnLoaderIsOnIds: number[];
}
