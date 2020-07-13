import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  minStepValue = 0;
  maxStepValue = 4;

  currentStep = new BehaviorSubject<number>(this.minStepValue);
  currentStep$ = this.currentStep.asObservable();

  constructor() {}

  nextStep(): void {
    const valueToBeSet = this.currentStep.value + 1;
    if (valueToBeSet <= this.maxStepValue) {
      this.currentStep.next(valueToBeSet);
    }
  }

  previousStep(): void {
    const valueToBeSet = this.currentStep.value - 1;
    if (valueToBeSet >= this.minStepValue) {
      this.currentStep.next(valueToBeSet);
    }
  }
}
