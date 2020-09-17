import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Pipe({
  name: 'ticks'
})
export class TicksPipe implements PipeTransform {
  transform(netTicksString: string): Date {
    const netTicks = Number(netTicksString);

    const dateToReturn = new Date(netTicks / 10000);

    dateToReturn.setHours(dateToReturn.getHours() - environment.backEndTimeZone);

    return dateToReturn;
  }
}
