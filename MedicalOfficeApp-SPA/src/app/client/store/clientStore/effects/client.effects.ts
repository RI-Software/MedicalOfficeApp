import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ClientService} from '../../../services/client.service';
import * as ClientActions from '../actions/client.actions';
import {catchError, concatMap, exhaustMap, withLatestFrom} from 'rxjs/operators';
import {NotificationService} from 'src/app/core/services/notification.service';
import {of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectClient} from '../selectors/client.selectors';
import {ActionStatusesEnum} from '../../../shared/models/ActionStatusesEnum';


@Injectable()
export class ClientEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.clientRegister),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectClient)))
      )),
      exhaustMap(([action, client]) =>
        this.clientService.register(client).pipe(
          concatMap(() => [
            ClientActions.clientRegisterSucceed(),
            ClientActions.clientRegisterStatus({registerStatus: ActionStatusesEnum.Done})
          ]),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return [
              ClientActions.clientRegisterFailed(),
              ClientActions.clientRegisterStatus({registerStatus: ActionStatusesEnum.Failed})
            ];
          })
        )
      )
    )
  );

  preRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.clientPreregister),
      exhaustMap((action) =>
        this.clientService.preregister(action.selectedDate, action.selectedTime).pipe(
          concatMap(() => [
            ClientActions.clientPreregisterSucceed(),
            ClientActions.clientPreregisterStatus({preregisterStatus: ActionStatusesEnum.Done})
          ]),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return [
              ClientActions.clientPreregisterFailed(),
              ClientActions.clientPreregisterStatus({preregisterStatus: ActionStatusesEnum.Failed})
            ];
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private store: Store
  ) {
  }
}
