import { Pipe, PipeTransform } from '@angular/core';
import {Dayjs} from 'dayjs';
import {DATES} from '@/constants';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: Dayjs): string {
    return value.format(DATES.FULL_MONTH);
  }

}
