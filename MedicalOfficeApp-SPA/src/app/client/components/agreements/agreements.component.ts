import {Component, OnInit, HostListener, OnDestroy} from '@angular/core';
import {PreventMoveBackService} from 'src/app/core/services/prevent-move-back.service';
import {select, Store} from '@ngrx/store';
import {nextBtnAvailability, step} from '../../store/stepStore/actions/step.actions';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {selectIsNextBtnPressed} from '../../store/stepStore/selectors/step.selectors';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }

  constructor(
    private preventMoveBackService: PreventMoveBackService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();
    this.store.dispatch(nextBtnAvailability({isAvailable: true}));
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectIsNextBtnPressed)
    ).subscribe((isPressed: boolean) => {
      if (isPressed) {
        this.store.dispatch(step({path: 'save'}));
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
