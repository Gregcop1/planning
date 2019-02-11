import { Pipe, PipeTransform } from '@angular/core';
import {Dayjs} from 'dayjs';
import {DATES} from '@/constants';

@Pipe({
  name: 'year'
})
export class YearPipe implements PipeTransform {

  transform(value: Dayjs): string {
    return value.format(DATES.YEAR);
  }

}
