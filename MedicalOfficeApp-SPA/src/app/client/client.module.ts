import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientComponent } from './client.component';
import { clientRoutes } from './client.routes';
import { StepsComponent } from './components/steps/steps.component';
import { StepControlComponent } from './components/step-control/step-control.component';
import { TimeComponent } from './components/time/time.component';
import { StepService } from './services/step.service';
import { DoneComponent } from './components/done/done.component';
import { SaveComponent } from './components/save/save.component';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { DataHomeComponent } from './components/data/data-home/data-home.component';
import { DataAdultComponent } from './components/data/data-adult/data-adult.component';
import { DataChildComponent } from './components/data/data-child/data-child.component';

@NgModule({
  declarations: [
    ClientComponent,
    StepsComponent,
    StepControlComponent,
    TimeComponent,
    DataHomeComponent,
    DataAdultComponent,
    DataChildComponent,
    AgreementsComponent,
    SaveComponent,
    DoneComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzStepsModule,
    NzCardModule,
    RouterModule.forChild(clientRoutes)
  ],
  providers: [
    StepService
  ]
})
export class ClientModule { }
