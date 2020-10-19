import {Component, OnDestroy, OnInit} from '@angular/core';
import {StepService} from '../../services/step.service';
import {TimeService} from '../../services/time.service';
import {AvailableDate, AvailableTime} from '../../shared/models/Date&Times';
import {ClientService} from '../../services/client.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {select, Store} from '@ngrx/store';
import {clientPreregister} from '../../store/clientStore/actions/client.actions';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {selectAvailableDates, selectAvailableTime, selectIsNextBtnPressed} from '../../store/stepStore/selectors/step.selectors';
import {getAvailableDates, getAvailableTime, nextBtnAvailability, step} from '../../store/stepStore/actions/step.actions';
import {selectPreregisterStatus} from '../../store/clientStore/selectors/client.selectors';
import {ActionStatusesEnum} from '../../shared/models/ActionStatusesEnum';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit, OnDestroy {
  get currentDate(): Date {
    return this._currentDate;
  }

  set currentDate(value: Date) {
    if (value) {
      this.store.dispatch(getAvailableTime({date: value}));
      this._currentDate = value;
      this.resetChosenTime();
    }
  }

  private _currentDate: Date;

  availableDates: AvailableDate[] = [];
  availableTimes: AvailableTime[] = [];

  currentTime: AvailableTime;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private stepService: StepService,
    private timeService: TimeService,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(getAvailableDates());

    this.store.pipe(
      select(selectAvailableDates),
      takeUntil(this.unsubscribe$)
    ).subscribe((availableDates) => {
      if (availableDates) {
        this.availableDates = availableDates;
        if (this.availableDates.length) {
          this.currentDate = this.availableDates.find((date) => {
            return date.status === 'Free';
          })?.date;
        }
      }
    });

    this.store.pipe(
      select(selectAvailableTime),
      takeUntil(this.unsubscribe$)
    ).subscribe((availableTime) => {
      if (availableTime) {
        this.availableTimes = availableTime;
      }
    });

    combineLatest([
      this.store.select(selectIsNextBtnPressed),
      this.store.select(selectPreregisterStatus)
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([isPressed, preregisterStatus]) => {
      if (isPressed) {
        switch (preregisterStatus) {
          case ActionStatusesEnum.Done:
            this.store.dispatch(step({path: 'data'}));
            return;
          default:
            this.store.dispatch(clientPreregister({selectedDate: this.currentDate, selectedTime: this.currentTime.time}));
            return;
        }
      }
    });
  }

  disabledDate = (current: Date): boolean => {
    return !this.timeService.checkAvailableDate(current);
  };

  nextDay(): void {
    this.currentDate = this.timeService.changeDate(this.currentDate, +1);
  }

  prevDay(): void {
    this.currentDate = this.timeService.changeDate(this.currentDate, -1);
  }

  nextMonth(): void {
    this.currentDate = this.timeService.changeDate(this.currentDate, 0, +1);
  }

  prevMonth(): void {
    this.currentDate = this.timeService.changeDate(this.currentDate, 0, -1);
  }

  private resetChosenTime(): void {
    this.currentTime = null;
    this.store.dispatch(nextBtnAvailability({isAvailable: false}));
  }

  timeSelected($event): void {
    this.store.dispatch(nextBtnAvailability({isAvailable: true}));
    this.currentTime = $event;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
