import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap} from 'rxjs/operators';
import * as StepActions from '../../stepStore/actions/step.actions';
import * as ClientActions from '../../clientStore/actions/client.actions';
import * as SharedActions from '../actions/shared.actions';
import {setMainLoaderStatus, setTimeLoaderStatus} from '../actions/shared.actions';
import {of} from 'rxjs';
import {LoaderService} from '../../../services/loader.service';

@Injectable()
export class SharedEffects {
  showMainLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SharedActions.showMainClientLoader,
        StepActions.getAvailableDates,
        ClientActions.clientPreregister,
        ClientActions.clientRegister
      ),
      concatMap(() => {
        return of(setMainLoaderStatus({isOn: true}));
      })
    )
  );

  hideMainLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SharedActions.hideMainClientLoader,
        StepActions.getAvailableDatesFailed,
        StepActions.getAvailableTimeSucceed,
        StepActions.getAvailableTimeFailed,
        ClientActions.clientRegisterSucceed,
        ClientActions.clientRegisterFailed,
        ClientActions.clientPreregisterSucceed,
        ClientActions.clientPreregisterFailed),
      concatMap(() => {
        return of(setMainLoaderStatus({isOn: false}));
      })
    )
  );

  showTimeBtnsLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SharedActions.showTimeBtnsLoader,
        StepActions.getAvailableTime
      ),
      concatMap(() => {
        return of(setTimeLoaderStatus({isOn: true}));
      })
    )
  );

  hideTimeBtnsLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SharedActions.hideTimeBtnsLoader,
        StepActions.getAvailableTimeSucceed,
        StepActions.getAvailableDatesFailed
      ),
      concatMap(() => {
        return of(setTimeLoaderStatus({isOn: false}));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private loaderService: LoaderService) {
  }
}
