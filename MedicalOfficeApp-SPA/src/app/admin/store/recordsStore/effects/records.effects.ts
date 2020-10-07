import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as RecordActions from '../actions/records.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {RecordsService} from '../../../services/records.service';
import {EMPTY} from 'rxjs';
import {setRecords} from '../actions/records.actions';
import {NotificationService} from '../../../../core/services/notification.service';


@Injectable()
export class RecordsEffects {

  seedRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.seedRecords),
      switchMap((action) =>
        this.recordsService.getRecords(
          action.pageSize,
          action.pageIndex,
          action.whereStatements,
          action.sortColumns,
          action.sortOrder).pipe(
          map((response) => {
            return setRecords({records: response.body});
          }),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return EMPTY;
          })
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private recordsService: RecordsService,
    private notificationService: NotificationService) {
  }
}
