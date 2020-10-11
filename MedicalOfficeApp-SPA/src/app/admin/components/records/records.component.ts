import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectIdsAcceptBtnLoaderIsOn, selectRecords} from '../../store/recordsStore/selectors/records.selectors';
import {ApiResult} from '../../shared/models/ApiResult';
import {Record} from '../../shared/models/Record';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {acceptRecord} from '../../store/recordsStore/actions/records.actions';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {

  apiResult: ApiResult<Record>;

  unsubscribe$: Subject<void> = new Subject<void>();

  idsAcceptBtnLoaderIsOn: number[];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectRecords),
      takeUntil(this.unsubscribe$)
    ).subscribe((records: ApiResult<Record>) => {
      this.apiResult = records;
    });

    this.store.pipe(
      select(selectIdsAcceptBtnLoaderIsOn),
      takeUntil(this.unsubscribe$)
    ).subscribe((ids: number[]) => {
      this.idsAcceptBtnLoaderIsOn = ids;
    });
  }

  isLoaderOn(recordId: number): boolean {
    return !!this.idsAcceptBtnLoaderIsOn.find((id) => id === recordId);
  }

  onAcceptBtnPress(recordId: number) {
    this.store.dispatch(acceptRecord({recordId}));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
