import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzCardModule} from 'ng-zorro-antd/card';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzAffixModule, NzIconModule} from 'ng-zorro-antd';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';

import {AdminComponent} from './admin.component';
import {adminRoutes} from './admin.routes';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './components/home/home.component';
import {adminModuleFeatureKey, reducers} from './store';
import {RecordsEffects} from './store/recordsStore/effects/records.effects';
import {RecordsComponent} from './components/records/records.component';
import {AdminEffects} from './store/adminStore/effects/admin.effects';
import {AdminServiceModule} from './services/admin-service.module';
import {AdminGuardsModule} from './guards/admin-guards.module';
import {RecordsControlsComponent} from './components/records-controls/records-controls.component';
import {RecordsAcceptRecordEffects} from './store/recordsStore/effects/records.acceptRecord.effects';
import {RecordsDeleteRecordEffects} from './store/recordsStore/effects/records.deleteRecord.effects';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    HomeComponent,
    RecordsComponent,
    RecordsControlsComponent
  ],
  imports: [
    StoreModule.forFeature(adminModuleFeatureKey, reducers),
    EffectsModule.forFeature([RecordsEffects, RecordsAcceptRecordEffects, RecordsDeleteRecordEffects, AdminEffects]),
    AdminServiceModule,
    AdminGuardsModule,
    SharedModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzPaginationModule,
    NzCalendarModule,
    NzMenuModule,
    NzLayoutModule,
    RouterModule.forChild(adminRoutes),
    NzAffixModule,
    NzIconModule,
    NzEmptyModule,
    NzSelectModule,
    NzToolTipModule,
    NzSpinModule,
    NzPopconfirmModule
  ]
})
export class AdminModule {
}
