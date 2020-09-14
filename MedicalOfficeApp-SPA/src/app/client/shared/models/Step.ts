import { Route } from '@angular/router';

export interface Step extends Route {
  stepName: string;
  icon: string;
}
