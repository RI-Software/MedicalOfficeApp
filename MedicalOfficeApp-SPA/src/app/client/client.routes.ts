import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { TimeComponent } from './components/time/time.component';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [{ path: 'time', component: TimeComponent }],
  },
];
