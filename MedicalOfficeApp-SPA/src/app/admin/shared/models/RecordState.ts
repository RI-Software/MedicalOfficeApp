import { Record } from './Record';
import {ApiResult} from './ApiResult';
import {RecordsSettings} from './RecordsSettings';

export interface RecordsState {
  records: ApiResult<Record>;
  recordsSettings: RecordsSettings;
  acceptBtnLoaderIsOnIds: number[];
  deleteBtnLoaderIsOnIds: number[];
}
