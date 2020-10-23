import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import {RouterModule} from '@angular/router';
import en from '@angular/common/locales/en';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {en_US, NZ_I18N} from 'ng-zorro-antd';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {environment} from 'src/environments/environment';
import {httpInterceptorProviders} from './core/interceptors/httpInterceptorProvider';

registerLocaleData(en);

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    httpInterceptorProviders,
    {provide: NZ_I18N, useValue: en_US},
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
