import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { amdinRoutes } from './admin.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(amdinRoutes)
  ]
})
export class AdminModule { }
