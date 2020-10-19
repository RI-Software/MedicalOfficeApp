import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {LoaderService} from '../../../../core/services/loader.service';
import * as StepActions from '../../stepStore/actions/step.actions';
import * as ClientActions from '../../clientStore/actions/client.actions';
import * as SharedActions from '../actions/shared.actions';

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
        tap(() => {
          this.loaderService.showLoader('mainClientSpinner');
        })
      ),
    {dispatch: false}
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
        tap(() => {
          this.loaderService.hideLoader('mainClientSpinner');
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private loaderService: LoaderService) {
  }
}
