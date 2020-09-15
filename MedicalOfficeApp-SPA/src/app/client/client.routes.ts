import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { TimeComponent } from './components/time/time.component';
import { DataComponent } from './components/data/data.component';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { SaveComponent } from './components/save/save.component';
import { DoneComponent } from './components/done/done.component';
import {PreventIllegalStepGuard} from './guards/prevent-illegal-step.guard';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    runGuardsAndResolvers: 'always',
    canActivateChild: [PreventIllegalStepGuard],
    children: [
      { path: '', redirectTo: 'time', pathMatch: 'full' },
      { path: 'time', component: TimeComponent },
      { path: 'data', component: DataComponent },
      { path: 'agreements', component: AgreementsComponent },
      { path: 'save', component: SaveComponent },
      { path: 'done', component: DoneComponent }
    ],
    loadChildren: './services/client-service.module#ClientServiceModule'
  }
];
