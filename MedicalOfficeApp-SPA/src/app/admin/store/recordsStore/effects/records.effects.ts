import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as RecordActions from '../actions/records.actions';
import {
  catchError,
  map,
  switchMap, tap,
} from 'rxjs/operators';
import {RecordsService} from '../../../services/records.service';
import {EMPTY} from 'rxjs';
import {NotificationService} from '../../../../core/services/notification.service';

@Injectable()
export class RecordsEffects {

  seedRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.getRecords),
      switchMap((action) =>
        this.recordsService.getRecords(
          action.pageSize,
          action.pageIndex,
          action.whereStatements,
          action.sortColumns,
          action.sortOrder).pipe(
          map((response) => {
            return RecordActions.setRecords({records: response.body});
          }),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return EMPTY;
          })
        )
      )
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
    private notificationService: NotificationService) {
  }
}
