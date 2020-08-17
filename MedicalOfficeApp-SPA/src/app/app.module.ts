import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NavComponent } from './core/components/nav/nav.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd';

registerLocaleData(en);

@NgModule({
   declarations: [
     AppComponent,
     NavComponent,
   ],
   imports: [
     BrowserModule,
     BrowserAnimationsModule,
     HttpClientModule,
     RouterModule.forRoot(appRoutes),
   ],
   providers: [
     {provide: NZ_I18N, useValue: en_US},
   ],
   bootstrap: [
     AppComponent,
   ],
 })
export class AppModule { }
