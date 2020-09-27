import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AdminService} from '../../../services/admin.service';
import {checkTokenValidity, loginAdmin, navigateAdmin, setLoginStatus} from '../actions/admin.actions';
import {catchError, concatMap, concatMapTo, exhaustMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {NotificationService} from '../../../../core/services/notification.service';
import {NavigationService} from '../../../services/navigation.service';
import {AuthService} from '../../../../core/services/auth.service';


@Injectable()
export class AdminEffects {

  loginAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAdmin),
      exhaustMap((action) =>
        this.adminService.login(action.username, action.password).pipe(
          concatMapTo([
            setLoginStatus({status: true}),
            navigateAdmin({path: 'home'})
          ]),
          catchError((error) => {
            this.notificationService.error(error + '\n' + 'Try again.');
            return of(setLoginStatus({status: false}));
          })
        ))
    )
  );

  navigateAdmin$ = createEffect(() =>
      this.actions$.pipe(
        ofType(navigateAdmin),
        tap((properties) => {
          this.navigationService.navigate(properties.path);
        })
      ),
    {dispatch: false}
  );

  checkTokenValidity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkTokenValidity),
      concatMap((action) => {
          const isValid = this.authService.isTokenValid(action.role);
          return of(setLoginStatus({status: isValid}));
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
    private authService: AuthService) {
  }
}
