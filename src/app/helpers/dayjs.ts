import * as dayjs_ from 'dayjs';
import 'dayjs/locale/fr';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekOfYear from 'dayjs/plugin/weekOfYear';

export const dayjs = (dayjs_ as any).default || dayjs_;

dayjs.locale('fr');
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);

declare module 'dayjs' {
  interface Dayjs {
    isBetween(first: Dayjs, second: Dayjs);
    isSameOrAfter(date: Dayjs, selector: string);
    isSameOrBefore(date: Dayjs, selector: string);
    week();
  }
}
