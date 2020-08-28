import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';
import { TimeService } from '../../services/time.service';
import { AvailableDate, AvailableTime } from '../../shared/models/Date&Times';
import { MoveType } from '../../shared/models/MoveTypeEnum';
import { DataComponent } from '../data/data.component';
import { ClientService } from '../../services/client.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  get currentDate(): Date {
    return this._currentDate;
  }

  set currentDate(value: Date) {
    if (value) {
      this.timeService.getAvailableTime(value);
      this._currentDate = value;
      this.resetChoosenTime();
    }
  }

  private _currentDate: Date = new Date();

  availableDates: AvailableDate[] = [];
  availableTimes: AvailableTime[] = [];

  currentTime: AvailableTime;

  constructor(
    private stepService: StepService,
    private timeService: TimeService,
    private clientService: ClientService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.timeService.getAvailableDates();
    this.timeService.availableDates.subscribe((value => {
      this.availableDates = value;
      if (this.availableDates.length) {
        this.currentDate = this.availableDates[0].date;
      }
    }));
    this.timeService.availableTimes.subscribe((value => {
      this.availableTimes = value;
    }));
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

  async timeSelected($event): Promise<void> {
    this.currentTime = $event;

    const callbackParams = {
      date: this.currentDate,
      time: this.currentTime.time
    };

    const callback = (params: any): boolean => {
      this.clientService.preregister(params.date, params.time).subscribe(next => {
        this.notificationService.success('First step is done successfully');
      }, error => {
        this.notificationService.error(error + '\n' + 'Try again.');
        return false;
      });

      return true;
    };


    this.stepService.StepPreparing(DataComponent, MoveType.MoveNext, callbackParams, callback);
  }

  private resetChoosenTime(): void {
    this.currentTime = null;
    this.stepService.disableTheStep();
  }
}
