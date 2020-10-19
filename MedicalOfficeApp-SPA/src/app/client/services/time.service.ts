import {Injectable} from '@angular/core';
import {AvailableDate, AvailableTime} from '../shared/models/Date&Times';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../core/services/notification.service';
import {environment} from '../../../environments/environment';
import {ClientServiceModule} from './client-service.module';
import {select, Store} from '@ngrx/store';
import {selectAvailableDates, selectAvailableTime} from '../store/stepStore/selectors/step.selectors';

@Injectable({
  providedIn: ClientServiceModule
})
export class TimeService {

  availableDates: AvailableDate[];
  availableTimes: AvailableTime[];

  constructor(private httpClient: HttpClient, private notification: NotificationService, private store: Store) {

    this.store.pipe(
      select(selectAvailableDates)
    ).subscribe((availableDates) => {
      this.availableDates = availableDates;
    });

    this.store.pipe(
      select(selectAvailableTime)
    ).subscribe((availableTime) => {
      this.availableTimes = availableTime;
    });
  }

  getAvailableDates() {
    return this.httpClient
      .get<AvailableDate[]>(environment.apiDatetimeUrl, {observe: 'response'});
  }

  getAvailableTime(date: Date) {
    return this.httpClient
      .get<AvailableTime[]>(environment.apiDatetimeUrl + date.toDateString(), {observe: 'response'});
  }

  /**
   * @description
   * Adds or subtracts days and months from the date in order to return
   *  date with free status.
   *
   * If months are adding, then it returns first available date in the
   *  required month.
   * @param currentDate Date you wanna change.
   * @param cDay It can be positive or negative number depending on
   *  whether you want to add or subtract days.
   * @param cMonth It can be positive or negative number depending on
   *  whether you want to add or subtract months.
   * @returns Date with Free status or currentDate or null if required
   * date is not found.
   */
  changeDate(currentDate: Date, cDay = 0, cMonth = 0): Date | null {

    const availableDates = this.availableDates;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + cMonth;
    const day = currentDate.getDate() + cDay;

    if (cMonth !== 0) {
      return availableDates.find((date) => {
        return date.date.getMonth() === month && date.status === 'Free';
      })?.date;
    }

    const newDate = new Date(year, month, day);

    const dateIndex = availableDates.findIndex((date) => {
      return this.isDatesEqual(date.date, newDate);
    });

    if (dateIndex < 0) {
      return null;
    }

    const delta = cDay > 0 ? 1 : -1;

    for (let i = dateIndex; i < availableDates.length && i > -1; i += delta) {
      const date = availableDates[i];

      if (date.status === 'Busy') {
        continue;
      }

      return date.date;
    }

    return null;
  }

  checkAvailableDate(checkDate: Date): boolean {
    return !!this.availableDates.find((val) => {
      if (val.status === 'Free') {
        return this.isDatesEqual(checkDate, val.date);
      } else {
        return false;
      }
    });
  }

  private isDatesEqual(date1: Date, date2: Date): boolean {
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    return date1.toDateString() === date2.toDateString();
  }
}
