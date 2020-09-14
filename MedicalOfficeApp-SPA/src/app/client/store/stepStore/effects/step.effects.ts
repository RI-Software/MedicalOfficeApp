import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as StepActions from '../actions/step.actions';
import {tap} from 'rxjs/operators';
import {StepService} from '../../../services/step.service';

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

  constructor(
    private actions$: Actions,
    private stepService: StepService) {
  }
}
