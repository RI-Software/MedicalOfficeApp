import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { ClientComponent } from './client.component';
import { clientRoutes } from './client.routes';
import { StepsComponent } from './components/steps/steps.component';
import { StepControlComponent } from './components/step-control/step-control.component';
import { TimeComponent } from './components/time/time.component';
import { StepService } from './services/step.service';

@NgModule({
  declarations: [
    ClientComponent,
    StepsComponent,
    StepControlComponent,
    TimeComponent
  ],
  imports: [
    CommonModule,
    NzStepsModule,
    RouterModule.forChild(clientRoutes)
  ],
  providers: [
    StepService
  ]
})
export class ClientModule { }
