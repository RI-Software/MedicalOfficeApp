import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  selectIdsAcceptBtnLoaderIsOn,
  selectIdsDeleteBtnLoaderIsOn,
  selectRecords
} from '../../store/recordsStore/selectors/records.selectors';
import {ApiResult} from '../../shared/models/ApiResult';
import {Record} from '../../shared/models/Record';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {acceptRecord, deleteRecord} from '../../store/recordsStore/actions/records.actions';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {

  apiResult: ApiResult<Record>;

  unsubscribe$: Subject<void> = new Subject<void>();

  idsAcceptBtnLoaderIsOn: number[];
  idsDeleteBtnLoaderIsOn: number[];

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

    this.store.pipe(
      select(selectIdsDeleteBtnLoaderIsOn),
      takeUntil(this.unsubscribe$)
    ).subscribe((ids: number[]) => {
      this.idsDeleteBtnLoaderIsOn = ids;
    });
  }

  isAcceptLoaderOn(recordId: number): boolean {
    return !!this.idsAcceptBtnLoaderIsOn.find((id) => id === recordId);
  }

  isDeleteLoaderOn(recordId: number): boolean {
    return !!this.idsDeleteBtnLoaderIsOn.find((id) => id === recordId);
  }

  onAcceptBtnPress(recordId: number) {
    this.store.dispatch(acceptRecord({recordId}));
  }

  onDeleteBtnPress(recordId: number) {
    this.store.dispatch(deleteRecord({recordId}));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
