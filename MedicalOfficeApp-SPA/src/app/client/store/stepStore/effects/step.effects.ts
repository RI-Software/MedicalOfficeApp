import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as StepActions from '../actions/step.actions';
import {catchError, concatMap, mergeMap, tap} from 'rxjs/operators';
import {StepService} from '../../../services/step.service';
import {TimeService} from '../../../services/time.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {of} from 'rxjs';
import {formatDate} from '@angular/common';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class StepEffects {
  step$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StepActions.step),
        tap((properties) => {
            this.stepService.navigateUser(properties.path);
          }
        )
      ),
    {dispatch: false}
  );

  getAvailableDates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StepActions.getAvailableDates),
      mergeMap(() => this.timeService.getAvailableDates()
        .pipe(
          concatMap((response) => {
            response.body.forEach(value => {
              value.date = new Date(formatDate(value.date, 'mediumDate', 'en-US', environment.backEndTimeZone));
            });
            return [
              StepActions.getAvailableDatesSucceed(),
              StepActions.setAvailableDates({availableDates: response.body})
            ];
          }),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again');
            return of(StepActions.getAvailableDatesFailed());
          })
        )
      )
    )
  );

  getAvailableTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StepActions.getAvailableTime),
      mergeMap((action) => this.timeService.getAvailableTime(action.date)
        .pipe(
          concatMap((response) => {
            return [
              StepActions.getAvailableTimeSucceed(),
              StepActions.setAvailableTime({availableTime: response.body})
            ];
          }),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again');
            return of(StepActions.getAvailableTimeFailed());
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private stepService: StepService,
    private timeService: TimeService,
    private notificationService: NotificationService) {
  }
}
