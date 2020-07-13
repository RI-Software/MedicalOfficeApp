import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { ClientComponent } from './client.component';
import { clientRoutes } from './client.routes';
import { StepsComponent } from './components/steps/steps.component';

@NgModule({
  declarations: [
    ClientComponent,
    StepsComponent
  ],
  imports: [
    CommonModule,
    NzStepsModule,
    RouterModule.forChild(clientRoutes)
  ]
})
export class ClientModule { }
