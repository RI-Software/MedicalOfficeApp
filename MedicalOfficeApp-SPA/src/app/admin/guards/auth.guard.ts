import {Injectable} from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {selectIsAdminLoggedIn} from '../store/adminStore/selectors/admin.selectors';
import {navigateAdmin} from '../store/adminStore/actions/admin.actions';
import {AdminGuardsModule} from './admin-guards.module';

@Injectable({
  providedIn: AdminGuardsModule
})
export class AuthGuard implements CanActivate {

  isLoggedIn: boolean;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.isLoggedIn) {
      this.store.dispatch(navigateAdmin({path: 'login'}));
      return false;
    }

    return true;
  }

  constructor(private store: Store) {
    this.store.pipe(
      select(selectIsAdminLoggedIn)
    ).subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
