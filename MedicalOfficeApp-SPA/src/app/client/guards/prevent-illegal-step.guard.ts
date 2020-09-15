import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {selectCurrentStep} from '../store/stepStore/selectors/step.selectors';
import {step} from '../store/stepStore/actions/step.actions';

@Injectable({
  providedIn: 'root'
})
export class PreventIllegalStepGuard implements CanActivateChild {

  currentStep: string;

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    console.log(childRoute.routeConfig.path);
    if (this.currentStep === childRoute.routeConfig.path) {
      return true;
    }

    this.store.dispatch(step({path: 'time'}));
    return false;
  }

  constructor(
    private router: Router,
    private store: Store) {
    this.store.pipe(
      select(selectCurrentStep)
    ).subscribe((currentStep: string) => {
      this.currentStep = currentStep;
    });
  }
}
