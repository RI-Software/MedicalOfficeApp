import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { steps } from 'src/app/core/models/stepModels';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StepService {

  minStepValue = 0;
  maxStepValue = steps.length - 1;

  currentStep = new BehaviorSubject<number>(this.minStepValue);
  currentStep$ = this.currentStep.asObservable();

  constructor(private router: Router) {}

  nextStep(): void {
    const valueToBeSet = this.currentStep.value + 1;
    if (valueToBeSet <= this.maxStepValue) {
      this.currentStep.next(valueToBeSet);
      this.navigateUser();
    }
  }

  previousStep(): void {
    const valueToBeSet = this.currentStep.value - 1;
    if (valueToBeSet >= this.minStepValue) {
      this.currentStep.next(valueToBeSet);
      this.navigateUser();
    }
  }

  navigateUser(): void {
    this.router.navigate(['signup/' + steps[this.currentStep.value].route.path]);
  }
}
