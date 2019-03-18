import {Dayjs} from 'dayjs';
import {Event} from '@/interfaces/Event';

export interface Day {
  day: Dayjs;
  events?: Event[];
}

export interface Week {
  number: number;
  days: Day[];
}

export interface WeekForm {
  startDay: Dayjs;
  endDay: Dayjs;
}
