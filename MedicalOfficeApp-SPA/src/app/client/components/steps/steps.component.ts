import {Component, OnDestroy, OnInit} from '@angular/core';
import {Step} from '../../shared/models/Step';
import {select, Store} from '@ngrx/store';
import {selectCurrentStepIndex, selectSteps} from '../../store/stepStore/selectors/step.selectors';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit, OnDestroy {
  steps: Step[];
  currentIndex: number;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectSteps)
    ).subscribe((steps: Step[]) => this.steps = steps);

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectCurrentStepIndex)
    ).subscribe((index: number) => this.currentIndex = index);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
