import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiResult} from '../shared/models/ApiResult';
import {Record} from '../shared/models/Record';
import {AdminModule} from '../admin.module';


@Injectable({
  providedIn: 'root' // AdminModule
})
export class RecordsService {

  constructor(private http: HttpClient) {
  }

  getRecords(pageSize?: number, pageIndex?: number, sortColumns?: string[], sortOrder?: string) {
    let params = new HttpParams();

    if (pageSize) {
      params = params.append('pageSize', String(pageSize));
    }

    if (pageIndex) {
      params = params.append('pageIndex', String(pageIndex));
    }

    if (sortColumns) {
      sortColumns.forEach((col) => params = params.append('sortColumns', col));
    }

    if (sortOrder) {
      params = params.append('sortOrder', sortOrder);
    }

    return this.http.get<ApiResult<Record>>(environment.apiRecordsUrl, {observe: 'response', params});
  }
}
