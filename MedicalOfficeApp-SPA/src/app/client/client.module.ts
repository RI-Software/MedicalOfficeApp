import { AgreementsComponent } from './components/agreements/agreements.component';
import { ClientComponent } from './client.component';
import { CommonModule } from '@angular/common';
import { DataComponent } from './components/data/data.component';
import { DoneComponent } from './components/done/done.component';
import { NgModule } from '@angular/core';
import {
  NzBadgeModule,
  NzButtonModule, NzCalendarModule,
  NzDatePickerModule,
  NzIconModule,
  NzRadioModule,
  NzToolTipModule,
  NzWaveModule,
} from 'ng-zorro-antd'
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SaveComponent } from './components/save/save.component';
import { StepControlComponent } from './components/step-control/step-control.component';
import { StepService } from './services/step.service';
import { StepsComponent } from './components/steps/steps.component';
import { TimeComponent } from './components/time/time.component';
import { clientRoutes } from './client.routes';


@NgModule({
  declarations: [
    AgreementsComponent,
    ClientComponent,
    DataComponent,
    DoneComponent,
    SaveComponent,
    StepControlComponent,
    StepsComponent,
    TimeComponent,
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzDatePickerModule,
    NzIconModule,
    NzRadioModule,
    NzStepsModule,
    NzToolTipModule,
    NzWaveModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(clientRoutes),
    NzBadgeModule,
    NzCalendarModule,
  ],
  providers: [
    StepService,
  ],
})
export class ClientModule { }
