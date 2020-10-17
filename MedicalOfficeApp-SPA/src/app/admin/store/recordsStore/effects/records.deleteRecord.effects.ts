import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as RecordActions from '../actions/records.actions';
import {catchError, concatMap, concatMapTo, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {RecordsService} from '../../../services/records.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {select, Store} from '@ngrx/store';
import {selectIdsDeleteBtnLoaderIsOn} from '../selectors/records.selectors';

@Injectable()
export class RecordsDeleteRecordEffects {

  deleteRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.deleteRecord),
      concatMap((action) => of(RecordActions.performDeleteRecordRequest({recordId: action.recordId})))
    )
  );

  performDeleteRecordRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.performDeleteRecordRequest),
      exhaustMap((action) =>
        this.recordsService.deleteRecord(action.recordId).pipe(
          concatMapTo(
            [
              RecordActions.getRecords(),
              RecordActions.displaySucceedMessage({notificationText: 'Successfully deleted'})
            ]),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return of(RecordActions.deleteRecordFailed({recordId: action.recordId}));
          })
        )
      )
    )
  );

  //#region loaders

  turnOnDeleteBtnLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RecordActions.deleteRecord
      ),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectIdsDeleteBtnLoaderIsOn)))
      )),
      concatMap(([action, recordIds]) => {
        const ids = recordIds.slice();

        ids.push(action.recordId);

        return of(RecordActions.setIdsDeleteBtnLoaderIsOn({recordIds: ids}));
      })
    )
  );

  turnOffDeleteBtnLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RecordActions.deleteRecordFailed,
        RecordActions.setRecords
      ),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectIdsDeleteBtnLoaderIsOn)))
      )),
      concatMap(([action, recordIds]) => {
        switch (action.type) {
          case RecordActions.setRecords.type:
            return of(RecordActions.setIdsDeleteBtnLoaderIsOn({recordIds: []}));
          case RecordActions.deleteRecordFailed.type:
            const ids = recordIds.slice();

            const index = ids.findIndex((id) => id === action.recordId);

            ids.splice(index, 1);

            return of(RecordActions.setIdsDeleteBtnLoaderIsOn({recordIds: ids}));
        }
      })
    )
  );

  //#endregion

  constructor(
    private actions$: Actions,
    private recordsService: RecordsService,
    private notificationService: NotificationService,
    private store: Store) {
  }
}
