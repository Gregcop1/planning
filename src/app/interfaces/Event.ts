import {Dayjs} from 'dayjs';

export enum EventType {
  UnpaidLeave = 'unpaid-leave',
  FreeVacation = 'free-vacation',
  BlockingEvent = 'blocking-event',
  Event = 'event',
}

export interface Event {
  author: string;
  endDate: Dayjs;
  label: string;
  startDate: Dayjs;
  description?: string;
  type: EventType;
}

export interface PendingEvent {
  endDate?: Dayjs;
  startDate?: Dayjs;
  type?: EventType;
  pending?: boolean;
}
