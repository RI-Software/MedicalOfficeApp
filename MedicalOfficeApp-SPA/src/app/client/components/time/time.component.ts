import { Component, OnInit } from '@angular/core';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { StepService } from '../../services/step.service';
import { MoveType } from '../../shared/models/MoveTypeEnum';
import { DataComponent } from '../data/data.component';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  constructor(private stepService: StepService) {}

  date: Date = null;
  dateFormat = 'EE, dd MMMM yyyy';
  availableTime = [
    { time: '10:00' },
    { time: '10:10', status: 'CLOSED' },
    { time: '10:20' },
    { time: '10:30' },
    { time: '10:40' },
    { time: '10:50' },
    { time: '11:00' },
    { time: '11:10' },
    { time: '11:20' },
    { time: '11:30' },
    { time: '11:40', status: 'RESERVED' },
    { time: '11:50' },
    { time: '12:00' }
  ];
  radioValue: string;

  mode = 'month';

  disabledDate = (current: Date): boolean => {
    // Can not select days before today
    return differenceInCalendarDays(current, new Date()) < 0;
  }

  ngOnInit() {
    this.date = new Date();
    this.stepService.StepPreparing(DataComponent, MoveType.MoveNext); // tmp
  }

  onChange($event: any) {
    console.log($event);
    const tempVal = this.availableTime;
    this.availableTime = [];
    setTimeout(() => {
      this.availableTime = tempVal;
    }, 5000);
  }

  nextDay(): void {
    if (this.date) {
      this.date = this.AddDaysToDate(this.date, 1);
    }
  }

  prevDay(): void {
    if (this.date) {
      this.date = this.AddDaysToDate(this.date, -1);
    }
  }

  prevMonth() {
    if (this.date) {
      this.date = new Date(new Date().setMonth(this.date.getMonth() - 1));
    }
  }

  nextMonth() {
    if (this.date) {
      this.date = new Date(new Date().setMonth(this.date.getMonth() + 1));
    }
  }

  private AddDaysToDate(sourceDate: Date, numOfDays: number): Date {
    const year = sourceDate.getFullYear();
    const month = sourceDate.getMonth();
    let date = sourceDate.getDate();

    date = date + numOfDays;

    return new Date(year, month, date);
  }
}
