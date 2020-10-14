import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiResult} from '../../shared/models/ApiResult';
import {Record} from '../../shared/models/Record';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectRecords} from '../../store/recordsStore/selectors/records.selectors';
import {takeUntil} from 'rxjs/operators';
import {getRecords} from '../../store/recordsStore/actions/records.actions';
import {WhereStatement} from '../../shared/models/WhereStatement';

@Component({
  selector: 'app-records-controls',
  templateUrl: './records-controls.component.html',
  styleUrls: ['./records-controls.component.scss']
})
export class RecordsControlsComponent implements OnInit, OnDestroy {

  currentPage;
  apiResult: ApiResult<Record>;

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
    this.store.dispatch(getRecords({}));

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

  settingsChanged() {
    this.getRecords();
  }

  onPageIndexChanged(index: number) {
    this.pageIndex = index - 1;

    this.getRecords();
  }

  onStatusPicked() {
    this.addWhereStatement({column: 'Status', value: this.status});

    this.getRecords();
  }

  onDatePicked(datePicked: Date) {
    this.addWhereStatement({column: 'Date', value: datePicked.toDateString()});

    this.getRecords();
  }

  resetBtnPressed() {
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
    this.store.dispatch(getRecords({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      whereStatements: this.whereStatements,
      sortOrder: this.sortOrder,
      sortColumns: this.sortColumns
    }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
