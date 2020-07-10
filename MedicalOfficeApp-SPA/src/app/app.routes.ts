import { Routes } from '@angular/router';
import { ClientModule } from './client/client.module';
import { ClientComponent } from './client/client.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' }, // tmp
  {
    path: 'signup',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: 'signup', pathMatch: 'full' }
];
