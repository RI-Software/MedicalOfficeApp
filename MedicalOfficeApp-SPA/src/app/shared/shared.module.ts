import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import {TimePipe} from './pipes/time.pipe';


@NgModule({
  declarations: [
    NavComponent,
    TimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavComponent,
    TimePipe
  ]
})
export class SharedModule { }
