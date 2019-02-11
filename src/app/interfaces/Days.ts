import {Dayjs} from 'dayjs';

export interface Day {
  day: Dayjs;
  event?: any[];
}

export interface Week {
  number: number;
  days: Day[];
}

export interface WeekForm {
  startDay: Dayjs;
  endDay: Dayjs;
}
