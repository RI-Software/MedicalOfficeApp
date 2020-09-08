import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { en_US, NZ_I18N } from 'ng-zorro-antd';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { environment } from 'src/environments/environment';
import { httpInterceptorProviders } from './core/interceptors/httpInterceptorProvider';
import { NavComponent } from './shared/components/nav/nav.component';

registerLocaleData(en);

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
    AppComponent,
    NavComponent,
   ],
   imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzNotificationModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: [environment.apiClientUrl + 'preregister'],
      },
    }),
   ],
   providers: [
    httpInterceptorProviders,
    {provide: NZ_I18N, useValue: en_US},
   ],
   bootstrap: [
    AppComponent,
   ],
 })
export class AppModule { }
