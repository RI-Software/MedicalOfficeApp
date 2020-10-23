import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  NzBadgeModule,
  NzButtonModule,
  NzCalendarModule,
  NzDatePickerModule,
  NzIconModule,
  NzRadioModule,
  NzResultModule,
  NzSelectModule,
  NzToolTipModule,
  NzWaveModule,
} from 'ng-zorro-antd';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TranslateModule} from '@ngx-translate/core';

import {SaveComponent} from './components/save/save.component';
import {StepControlComponent} from './components/step-control/step-control.component';
import {StepsComponent} from './components/steps/steps.component';
import {TimeComponent} from './components/time/time.component';
import {clientRoutes} from './client.routes';
import {DataComponent} from './components/data/data.component';
import {DoneComponent} from './components/done/done.component';
import {AgreementsComponent} from './components/agreements/agreements.component';
import {ClientComponent} from './client.component';
import {ClientServiceModule} from './services/client-service.module';
import {SharedModule} from '../shared/shared.module';
import {reducers} from './store';
import {ClientEffects} from './store/clientStore/effects/client.effects';
import {clientModuleFeatureKey} from './store';
import {StepEffects} from './store/stepStore/effects/step.effects';
import {ClientGuardsModule} from './guards/client-guards.module';
import {TimerComponent} from './components/timer/timer.component';
import {SharedEffects} from './store/shared/effects/shared.effects';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { NavContolsComponent } from './components/nav-contols/nav-contols.component';


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
    TimerComponent,
    LanguagePickerComponent,
    NavContolsComponent,
  ],
  imports: [
    StoreModule.forFeature(clientModuleFeatureKey, reducers),
    EffectsModule.forFeature([ClientEffects, StepEffects, SharedEffects]),
    ClientServiceModule,
    ClientGuardsModule,
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
    NzStatisticModule,
    NgxSpinnerModule,
    TranslateModule.forChild(),
    NzSelectModule
  ],
  providers: [],
})
export class ClientModule {
}
