import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';

@Pipe({
  name: 'ticks'
})
export class TicksPipe implements PipeTransform {
  transform(netTicksString: string): Date {
    const netTicks = Number(netTicksString);

    const dateToReturn = new Date(netTicks / 10000);

    return new Date(formatDate(dateToReturn, 'medium', 'en-US', '+0000'));
  }
}
