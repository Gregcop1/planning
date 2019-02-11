import { Pipe, PipeTransform } from '@angular/core';
import {Dayjs} from 'dayjs';
import {DATES} from '@/constants';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: Dayjs): string {
    return value.format(DATES.DAY);
  }

}
