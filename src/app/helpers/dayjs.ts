import * as dayjs_ from 'dayjs';
import 'dayjs/locale/fr';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';

export const dayjs = (dayjs_ as any).default || dayjs_;

dayjs.locale('fr');
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

declare module 'dayjs' {
  interface Dayjs {
    isBetween(first: Dayjs, second: Dayjs);
    week();
  }
}
