import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ActivateGuard } from './guards/activate.guard';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [ActivateGuard]
  },
];
