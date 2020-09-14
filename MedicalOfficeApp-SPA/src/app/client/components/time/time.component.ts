import {Component, OnDestroy, OnInit} from '@angular/core';
import {StepService} from '../../services/step.service';
import {TimeService} from '../../services/time.service';
import {AvailableDate, AvailableTime} from '../../shared/models/Date&Times';
import {ClientService} from '../../services/client.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {Store} from '@ngrx/store';
import {clientPreregister} from '../../store/clientStore/actions/client.actions';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {selectIsNextBtnPressed} from '../../store/stepStore/selectors/step.selectors';
import {nextBtnAvailability, step} from '../../store/stepStore/actions/step.actions';
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
      this.timeService.getAvailableTime(value);
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
    this.timeService.getAvailableDates();
    this.timeService.availableDates.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((value => {
      this.availableDates = value;
      if (this.availableDates.length) {
        this.currentDate = this.availableDates.find((date) => {
          return date.status === 'Free';
        })?.date;
      }
    }));
    this.timeService.availableTimes.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((value => {
      this.availableTimes = value;
    }));

    combineLatest([
      this.store.select(selectIsNextBtnPressed),
      this.store.select(selectPreregisterStatus)
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([isPressed, preregisterStatus]) => {
      if (isPressed) {
        if (preregisterStatus === ActionStatusesEnum.Done) {
          this.store.dispatch(step({path: 'data'}));
          return;
        }
        this.store.dispatch(clientPreregister({selectedDate: this.currentDate, selectedTime: this.currentTime.time}));
      }
    });

    //#region combineLatest or 2 subscriptions
    // this.store.pipe(
    //   select(selectIsNextBtnPressed),
    //   takeUntil(this.unsubscribe$)
    // ).subscribe((buttonPressed: boolean) => {
    //   if (buttonPressed) {
    //     this.store.dispatch(clientPreregister({selectedDate: this.currentDate, selectedTime: this.currentTime.time}));
    //   }
    // });
    //
    // this.store.pipe(
    //   select(selectPreregisterStatus),
    //   takeUntil(this.unsubscribe$)
    // ).subscribe((preregisterStatus: ActionStatusesEnum) => {
    //   if (preregisterStatus === ActionStatusesEnum.Done) {
    //     this.store.dispatch(step({path: 'data'}));
    //   }
    // });
    //#endregion
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
