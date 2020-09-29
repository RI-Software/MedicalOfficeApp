import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzCardModule} from 'ng-zorro-antd/card';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';

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
    EffectsModule.forFeature([RecordsEffects, AdminEffects]),
    AdminServiceModule,
    AdminGuardsModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzPaginationModule,
    NzDropDownModule,
    NzCalendarModule,
    NzMenuModule,
    NzLayoutModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule {
}
