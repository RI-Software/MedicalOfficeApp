import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NavComponent } from './core/components/nav/nav.component';
import { httpInterceptorProviders } from './core/Interceptors/httpInterceptorProvider';
import { BaseFormComponent } from './shared/base-form/base-form.component';

registerLocaleData(en);

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      BaseFormComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      httpInterceptorProviders
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
