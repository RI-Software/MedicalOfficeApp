import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

registerLocaleData(en);

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
