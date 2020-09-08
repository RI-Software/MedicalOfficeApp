import { Type } from '@angular/core';
import { Route } from '@angular/router';

export interface Step extends Route {
  stepName: string;
  component: Type<any>;
  icon: string;
}
