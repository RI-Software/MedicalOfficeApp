import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiResult} from '../../shared/models/ApiResult';
import {Record} from '../../shared/models/Record';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectRecords, selectRecordsSettings} from '../../store/recordsStore/selectors/records.selectors';
import {takeUntil} from 'rxjs/operators';
import {
  getRecords,
  resetRecordsSettings,
  setPageIndex, setPageSize,
  setSortColumns, setSortOrder,
  setWhereStatements
} from '../../store/recordsStore/actions/records.actions';
import {WhereStatement} from '../../shared/models/WhereStatement';
import {RecordsSettings} from '../../shared/models/RecordsSettings';

@Component({
  selector: 'app-records-controls',
  templateUrl: './records-controls.component.html',
  styleUrls: ['./records-controls.component.scss']
})
export class RecordsControlsComponent implements OnInit, OnDestroy {

  apiResult: ApiResult<Record>;
  recordsSettings: RecordsSettings;
  currentDate: Date = null;

  //#region seedParams
  pageIndex: number;
  pageSize: number;
  whereStatements: WhereStatement[];
  sortColumns: string[];
  sortOrder: string;
  status: string;
  //#endregion

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(getRecords());

    this.store.pipe(
      select(selectRecords),
      takeUntil(this.unsubscribe$)
    ).subscribe((records: ApiResult<Record>) => {
      if (records) {
        this.apiResult = records;
        this.pageIndex = records.pageIndex + 1;
      }
    });


    this.store.pipe(
      select(selectRecordsSettings),
      takeUntil(this.unsubscribe$)
    ).subscribe((settings: RecordsSettings) => {
      this.recordsSettings = settings;
    });
  }

  onPageIndexChanged() {
    this.pageIndex = this.pageIndex - 1;
    this.store.dispatch(setPageIndex({pageIndex: this.pageIndex}));
    this.getRecords();
  }

  onPageSizeChange() {
    this.store.dispatch(setPageSize({pageSize: this.pageSize}));
    this.getRecords();
  }

  onSortColumnChange() {
    this.store.dispatch(setSortColumns({sortColumns: this.sortColumns}));
    this.getRecords();
  }

  onSortOrderChange() {
    this.store.dispatch(setSortOrder({sortOrder: this.sortOrder}));
    this.getRecords();
  }

  onStatusPicked() {
    this.addWhereStatement({column: 'Status', value: this.status});

    this.store.dispatch(setWhereStatements({whereStatements: this.whereStatements}));

    this.getRecords();
  }

  onDatePicked(datePicked: Date) {
    this.addWhereStatement({column: 'Date', value: datePicked.toDateString()});
    this.store.dispatch(setWhereStatements({whereStatements: this.whereStatements}));
    this.getRecords();
  }

  resetBtnPressed() {
    this.store.dispatch(resetRecordsSettings());

    this.pageIndex = null;
    this.pageSize = null;
    this.whereStatements = null;
    this.sortColumns = null;
    this.sortOrder = null;
    this.currentDate = null;
    this.status = null;

    this.getRecords();
  }

  private addWhereStatement(statement: WhereStatement) {
    if (this.whereStatements) {
      const tmpStatements = this.whereStatements.slice();
      tmpStatements.unshift(statement);
      this.whereStatements = tmpStatements.filter((s, index) => {
        const isNotNull = s.value !== null;
        const isFirstOccurrence = tmpStatements.findIndex(st => st.column === s.column) === index;

        return isNotNull && isFirstOccurrence;
      });
    } else {
      this.whereStatements = [statement];
    }
  }

  private getRecords() {
    this.store.dispatch(getRecords());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
