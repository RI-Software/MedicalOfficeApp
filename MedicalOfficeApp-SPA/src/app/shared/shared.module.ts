import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { TicksPipe } from './pipes/ticksPipe/ticks.pipe';
import { CustomDatePipe } from './pipes/ticksPipe/custom-date.pipe';


@NgModule({
  declarations: [
    NavComponent,
    TicksPipe,
    CustomDatePipe
  ],
  imports: [
    CommonModule
  ],
    exports: [
        NavComponent,
        TicksPipe,
        CustomDatePipe
    ]
})
export class SharedModule { }
