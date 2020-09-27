import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {RouterModule} from '@angular/router';
import {adminRoutes} from './admin.routes';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './components/home/home.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {adminModuleFeatureKey, reducers} from './store';
import {RecordsEffects} from './store/recordsStore/effects/records.effects';
import {RecordsComponent} from './components/records/records.component';
import {AdminEffects} from './store/adminStore/effects/admin.effects';
import {AdminServiceModule} from './services/admin-service.module';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    HomeComponent,
    RecordsComponent
  ],
  imports: [
    StoreModule.forFeature(adminModuleFeatureKey, reducers),
    EffectsModule.forFeature([RecordsEffects, AdminEffects]),
    AdminServiceModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule {
}
