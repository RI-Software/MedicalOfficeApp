import { Injectable } from '@angular/core';
import { AvailableDate, AvailableTime } from '../shared/models/Date&Times';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  availableDates: BehaviorSubject<AvailableDate[]> = new BehaviorSubject([]);
  availableTimes: BehaviorSubject<AvailableTime[]> = new BehaviorSubject([]);

  radioValue: string;

  constructor(private httpClient: HttpClient, private notification: NotificationService) {
    // Mock
    // this.availableTimes.next([
    //   {time: '09:00'},
    //   {time: '10:10', status: 'Expired'},
    //   {time: '10:20'},
    //   {time: '10:30'},
    //   {time: '10:40'},
    //   {time: '10:50'},
    //   {time: '11:00'},
    //   {time: '11:10'},
    //   {time: '11:20'},
    //   {time: '11:30'},
    //   {time: '11:40', status: 'Taken'},
    //   {time: '11:50'},
    //   {time: '12:00'},
    // ]);
    //
    // this.availableDates.next([
    //   {date: new Date(2020, 8, 20), status: 'Free'},
    //   {date: new Date(2020, 8, 21), status: 'Free'},
    //   {date: new Date(2020, 8, 22), status: 'Free'},
    //   {date: new Date(2020, 8, 23), status: 'Busy'},
    //   {date: new Date(2020, 8, 24), status: 'Free'},
    //   {date: new Date(2020, 8, 25), status: 'Free'},
    // ]);
  }

  getAvailableDates(): void {
    this.httpClient.get(environment.apiDatetimeURL).subscribe(
      (response: AvailableDate[]) => {
        response.forEach(value => value.date = new Date(value.date));
        this.availableDates.next(response);
      },
      (err: HttpErrorResponse) => {
        this.notification.error(err.message);
      });
  }

  getAvailableTime(date: Date): void {
    this.httpClient.get(environment.apiDatetimeURL + date.toDateString()).subscribe(
      (response: AvailableTime[]) => {
        this.availableTimes.next(response);
      },
      (err: HttpErrorResponse) => {
        this.notification.error(err.message);
      });
  }

  changeDate(currentDate: Date, cDay = 0, cMonth = 0, cYear = 0): Date {
    const year = currentDate.getFullYear() + cYear;
    const month = currentDate.getMonth() + cMonth;
    const day = currentDate.getDate() + cDay;

    const newDate = new Date(year, month, day);
    return this.checkAvailableDate(newDate) ? newDate : null;
  }

  nextDate(currentDate: Date): Date {
    return new Date(this.availableDates.getValue().find((val) => {
      if (val.status === 'Free') {
        currentDate.setHours(0, 0, 0, 0);
        val.date.setHours(0, 0, 0, 0);
        return currentDate.toDateString() === val.date.toDateString();
      } else {
        return false;
      }
    }).date);
  }

  checkAvailableDate(checkDate: Date): boolean {
    return !!this.availableDates.getValue().find((val) => {
      if (val.status === 'Free') {
        checkDate.setHours(0, 0, 0, 0);
        val.date.setHours(0, 0, 0, 0);
        return checkDate.toDateString() === val.date.toDateString();
      } else {
        return false;
      }
    });
  }
}
