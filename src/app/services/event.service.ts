import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Event, EventType, PendingEvent} from '@/interfaces';
import {dayjs} from '@/helpers';
import {DATES} from '@/constants';
import {Dayjs} from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public $events: BehaviorSubject<Event[]> = new BehaviorSubject([]);
  public $pendingEvent: BehaviorSubject<PendingEvent|null> = new BehaviorSubject(null);

  constructor() {
    this.$events.next(this.sortEvent([
      {
        author: 'gregory.copin',
        label: 'AG des Tilleuls',
        type: EventType.BlockingEvent,
        startDate: dayjs().subtract(3, 'day'),
        endDate: dayjs().subtract(3, 'day'),
      },
      {
        author: 'gregory.copin',
        label: 'SF Live Lille',
        type: EventType.Event,
        startDate: dayjs().subtract(10, 'day'),
        endDate: dayjs().subtract(8, 'day'),
      },
      {
        author: 'gregory.copin',
        label: 'Congé Grégory',
        type: EventType.FreeVacation,
        startDate: dayjs().subtract(3, 'day'),
        endDate: dayjs().subtract(2, 'day'),
      },
      {
        author: 'olivier.lenancker',
        label: 'Sans solde Olivier',
        type: EventType.UnpaidLeave,
        startDate: dayjs().subtract(5, 'day'),
        endDate: dayjs().subtract(3, 'day'),
      },
    ]));
  }

  private sortEvent(events: Event[]): Event[] {
    return events.sort((a: Event, b: Event) => {
      const aStartDate = a.startDate.format(DATES.FULL_DATE);
      const bStartDate = b.startDate.format(DATES.FULL_DATE);
      if (aStartDate < bStartDate) {
        return -1;
      } else {
        if (aStartDate > bStartDate) {
          return 1;
        }
      }

      return a.endDate.format(DATES.FULL_DATE) < b.endDate.format(DATES.FULL_DATE) ? 1 : 0;
    });
  }

  public addPendingStatusToPending(status: boolean): void {
    this.$pendingEvent.next({
      ...this.$pendingEvent.getValue(),
      pending: status,
    });
  }

  public addStartDateToPending(startDate: Dayjs): void {
    this.$pendingEvent.next({
      ...this.$pendingEvent.getValue(),
      startDate,
    });
  }

  public addEndDateToPending(endDate: Dayjs): void {
    this.$pendingEvent.next({
      ...this.$pendingEvent.getValue(),
      endDate,
    });
  }

  public addTypeToPending(type: EventType): void {
    this.$pendingEvent.next({
      ...this.$pendingEvent.getValue(),
      type,
      pending: true,
    });
  }

  public cancelPendingEvent(): void {
    this.$pendingEvent.next(null);
  }

  public submitEvent(label: string): void {
    const {endDate, startDate, type} = this.$pendingEvent.getValue();
    this.$events.next(this.sortEvent([
      ...this.$events.getValue(),
      {
        author: 'gregory.copin',
        endDate,
        label,
        startDate,
        type,
      }
    ]));
    this.cancelPendingEvent();
  }
}
