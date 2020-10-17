import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as RecordActions from '../actions/records.actions';
import {
  catchError,
  concatMap,
  concatMapTo,
  exhaustMap,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import {RecordsService} from '../../../services/records.service';
import {of} from 'rxjs';
import {NotificationService} from '../../../../core/services/notification.service';
import {select, Store} from '@ngrx/store';
import {selectIdsAcceptBtnLoaderIsOn, selectRecords} from '../selectors/records.selectors';

@Injectable()
export class RecordsAcceptRecordEffects {

  acceptRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.acceptRecord),
      concatMap(({recordId}) => [
          RecordActions.setRecordStatus({recordId, status: 'accepted'})
        ]
      )
    )
  );

  setRecordStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.setRecordStatus),
      exhaustMap((action) =>
        this.recordsService.changeRecordStatus(action.recordId, action.status).pipe(
          concatMapTo([
            RecordActions.getRecord({recordId: action.recordId}),
            RecordActions.displaySucceedMessage({notificationText: 'Successfully accepted'}),
          ]),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return of(RecordActions.setRecordStatusFailed({recordId: action.recordId}));
          })
        )
      )
    )
  );

  getRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.getRecord),
      switchMap((action) =>
        this.recordsService.getRecord(action.recordId).pipe(
          map((response) => {
            return RecordActions.setRecord({record: response.body});
          }),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return of(RecordActions.getRecordFailed({recordId: action.recordId}));
          })
        )
      )
    )
  );

  setRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.setRecord),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectRecords)))
      )),
      concatMap(([properties, records]) => {

        const clone = Object.assign({}, records);

        clone.data = records.data.map((record) => {
          if (record.recordId === properties.record.recordId) {
            return properties.record;
          }

          return record;
        });

        return [
          RecordActions.setRecordSucceed({recordId: properties.record.recordId}),
          RecordActions.setRecords({records: clone})
        ];
      })
    )
  );

  //#region loaders

  turnOnAcceptBtnLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RecordActions.turnOnAcceptBtnLoader,
        RecordActions.acceptRecord
      ),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectIdsAcceptBtnLoaderIsOn)))
      )),
      concatMap(([action, recordIds]) => {
        const ids = recordIds.slice();

        ids.push(action.recordId);

        return of(RecordActions.setIdsAcceptBtnLoaderIsOn({recordIds: ids}));
      })
    )
  );

  turnOffAcceptBtnLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RecordActions.turnOffAcceptBtnLoader,
        RecordActions.setRecordStatusFailed,
        RecordActions.getRecordFailed,
        RecordActions.setRecordSucceed
      ),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectIdsAcceptBtnLoaderIsOn)))
      )),
      concatMap(([action, recordIds]) => {
        const ids = recordIds.slice();

        const index = ids.findIndex((id) => id === action.recordId);

        ids.splice(index, 1);

        return of(RecordActions.setIdsAcceptBtnLoaderIsOn({recordIds: ids}));
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
