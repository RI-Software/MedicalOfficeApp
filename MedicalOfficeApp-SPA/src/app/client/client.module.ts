import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCardModule } from 'ng-zorro-antd/card';

import { ClientComponent } from './client.component';
import { clientRoutes } from './client.routes';
import { StepsComponent } from './components/steps/steps.component';
import { StepControlComponent } from './components/step-control/step-control.component';
import { TimeComponent } from './components/time/time.component';
import { StepService } from './services/step.service';
import { DataComponent } from './components/data/data.component';
import { DoneComponent } from './components/done/done.component';
import { SaveComponent } from './components/save/save.component';
import { AgreementsComponent } from './components/agreements/agreements.component';

@NgModule({
  declarations: [
    ClientComponent,
    StepsComponent,
    StepControlComponent,
    TimeComponent,
    DataComponent,
    AgreementsComponent,
    SaveComponent,
    DoneComponent,
  ],
  imports: [
    CommonModule,
    NzStepsModule,
    NzCardModule,
    RouterModule.forChild(clientRoutes)
  ],
  providers: [
    StepService
  ]
})
export class ClientModule { }
