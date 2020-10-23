import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { TicksPipe } from './pipes/ticksPipe/ticks.pipe';
import { CustomDatePipe } from './pipes/ticksPipe/custom-date.pipe';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducers, sharedModuleFeatureKey} from './store';


@NgModule({
  declarations: [
    NavComponent,
    TicksPipe,
    CustomDatePipe
  ],
  imports: [
    StoreModule.forFeature(sharedModuleFeatureKey, reducers),
    EffectsModule.forFeature([]),
    CommonModule
  ],
    exports: [
        NavComponent,
        TicksPipe,
        CustomDatePipe
    ]
})
export class SharedModule { }
