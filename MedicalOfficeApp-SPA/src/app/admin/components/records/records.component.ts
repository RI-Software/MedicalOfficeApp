import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {seedRecords} from '../../store/recordsStore/actions/records.actions';
import {selectRecords} from '../../store/recordsStore/selectors/records.selectors';
import {ApiResult} from '../../shared/models/ApiResult';
import {Record} from '../../shared/models/Record';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(seedRecords({}));

    this.store.pipe(
      select(selectRecords),
      takeUntil(this.unsubscribe$)
    ).subscribe((records: ApiResult<Record>) => {
      console.log(records);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
