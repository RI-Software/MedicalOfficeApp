import { Type } from '@angular/core';
import { steps } from './models/stepModels';

export class Helpers {
  static canActivateShared(
    toBeActivatedPath: string,
    canBeActivated: Type<any>) {
    const stepToBeActivated = steps.find((step) => {
      return step.route.path === toBeActivatedPath;
    }).route.component;

    if (stepToBeActivated === canBeActivated) {
      return true;
    }

    return false;
  }
}

