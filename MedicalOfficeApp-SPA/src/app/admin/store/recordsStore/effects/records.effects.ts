import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as RecordActions from '../actions/records.actions';
import {
  catchError, concatMap,
  map,
  switchMap, tap, withLatestFrom,
} from 'rxjs/operators';
import {RecordsService} from '../../../services/records.service';
import {of} from 'rxjs';
import {NotificationService} from '../../../../core/services/notification.service';
import {select, Store} from '@ngrx/store';
import {selectRecordsSettings} from '../selectors/records.selectors';

@Injectable()
export class RecordsEffects {

  getRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.getRecords),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectRecordsSettings)))
      )),
      switchMap(([action, settings]) =>
        this.recordsService.getRecords(
          settings.pageSize,
          settings.pageIndex,
          settings.whereStatements,
          settings.sortColumns,
          settings.sortOrder).pipe(
          map((response) => {
            return RecordActions.getRecordsSucceed({records: response.body});
          }),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return of(RecordActions.getRecordsFailed);
          })
        )
      )
    )
  );

  getRecordsSucceed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.getRecordsSucceed),
      concatMap((action) => of(RecordActions.setRecords({records: action.records})))
    )
  );

  displaySuccessMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(RecordActions.displaySucceedMessage),
        tap((properties) => {
          this.notificationService.success(properties.notificationText);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private recordsService: RecordsService,
    private notificationService: NotificationService,
    private store: Store) {
  }
}
