import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { StepService } from '../services/step.service';

@Injectable({
  providedIn: 'root',
})
export class ActivateGuard implements CanActivate {

  constructor(private stepService: StepService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.stepService.canMove;
  }
}
