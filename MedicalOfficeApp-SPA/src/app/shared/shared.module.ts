import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { TicksPipe } from './pipes/ticksPipe/ticks.pipe';


@NgModule({
  declarations: [
    NavComponent,
    TicksPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavComponent,
    TicksPipe
  ]
})
export class SharedModule { }
