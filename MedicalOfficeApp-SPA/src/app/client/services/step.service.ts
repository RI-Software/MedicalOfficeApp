import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepsComponent } from '../components/steps/steps.component';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  steps: Step[] = [
    new Step('time', 'Time', 'clock-circle'),
    new Step('data', 'Data', 'solution'),
    new Step('agreements', 'Agreements', 'file-text'),
    new Step('save', 'Save', 'save'),
    new Step('done', 'Done', 'check'),
  ];
  minStepValue = 0;
  maxStepValue = this.steps.length - 1;

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

export class Step {
  routeName: string;
  displayName: string;
  iconName: string;

  constructor(routeName: string, displayName: string, iconName: string) {
    this.routeName = routeName;
    this.displayName = displayName;
    this.iconName = iconName;
  }
}
