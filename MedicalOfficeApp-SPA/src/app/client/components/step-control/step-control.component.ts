import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {selectNextBtnValue} from '../../store/stepStore/selectors/step.selectors';
import {stepBtnPressStatus} from '../../store/stepStore/actions/step.actions';


@Component({
  selector: 'app-step-control',
  templateUrl: './step-control.component.html',
  styleUrls: ['./step-control.component.scss'],
})
export class StepControlComponent implements OnInit, OnDestroy {
  previousButtonIsActive = false;
  nextButtonIsActive = false;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectNextBtnValue)).subscribe((value: boolean) => this.nextButtonIsActive = value);
  }

  step() {
    this.store.dispatch(stepBtnPressStatus({isPressed: true}));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
