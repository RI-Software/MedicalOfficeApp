import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiResult} from '../../shared/models/ApiResult';
import {Record} from '../../shared/models/Record';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectRecords} from '../../store/recordsStore/selectors/records.selectors';
import {takeUntil} from 'rxjs/operators';
import {seedRecords} from '../../store/recordsStore/actions/records.actions';
import {WhereStatement} from '../../shared/models/WhereStatement';

@Component({
  selector: 'app-records-controls',
  templateUrl: './records-controls.component.html',
  styleUrls: ['./records-controls.component.scss']
})
export class RecordsControlsComponent implements OnInit, OnDestroy {

  currentPage;
  apiResult: ApiResult<Record>;

  //#region seedParams
  pageIndex: number;
  pageSize: number;
  whereStatements: WhereStatement[];
  sortColumns: string[];
  sortOrder: string;
  //#endregion

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(seedRecords({}));

    this.store.pipe(
      select(selectRecords),
      takeUntil(this.unsubscribe$)
    ).subscribe((records: ApiResult<Record>) => {
      if (records) {
        this.apiResult = records;
        this.currentPage = records.pageIndex + 1;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onDatePicked(datePicked: Date) {
    if (this.whereStatements) {
      this.whereStatements = this.whereStatements.map((s) => {
        if (s.column === 'Date') {
          return {column: 'Date', value: datePicked.toDateString()};
        }
      });
    } else {
      this.whereStatements = [{column: 'Date', value: datePicked.toDateString()}];
    }

    this.seedRecords();
  }

  private seedRecords() {
    this.store.dispatch(seedRecords({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      whereStatements: this.whereStatements,
      sortOrder: this.sortOrder,
      sortColumns: this.sortColumns
    }));
  }
}
