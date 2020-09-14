import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NzBadgeModule,
  NzButtonModule,
  NzCalendarModule,
  NzDatePickerModule,
  NzIconModule,
  NzRadioModule,
  NzResultModule,
  NzToolTipModule,
  NzWaveModule,
} from 'ng-zorro-antd';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { SaveComponent } from './components/save/save.component';
import { StepControlComponent } from './components/step-control/step-control.component';
import { StepsComponent } from './components/steps/steps.component';
import { TimeComponent } from './components/time/time.component';
import { clientRoutes } from './client.routes';
import { DataComponent } from './components/data/data.component';
import { DoneComponent } from './components/done/done.component';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { ClientComponent } from './client.component';
import { ClientServiceModule } from './services/client-service.module';
import { SharedModule } from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import {EffectsModule} from '@ngrx/effects';
import {ClientEffects} from './store/clientStore/effects/client.effects';
import {clientModuleFeatureKey} from './store';
import {StepEffects} from './store/stepStore/effects/step.effects';


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
    StoreModule.forFeature(clientModuleFeatureKey, reducers),
    EffectsModule.forFeature([ClientEffects, StepEffects]),
    ClientServiceModule,
    SharedModule,
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
    NzResultModule,
    NzDividerModule,
  ],
  providers: [],
})
export class ClientModule {
}
