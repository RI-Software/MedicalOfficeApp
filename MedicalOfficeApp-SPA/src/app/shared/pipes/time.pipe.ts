import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: string): string {
      return time.split(':').slice(0, 2).join(':');
  }
}
