import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Dayjs} from 'dayjs';
import {dayjs} from '@/helpers';
import {Event, EventType, PendingEvent, Week, WeekForm} from '@/interfaces';
import {dateHelper} from '@/helpers/date';
import {combineLatest} from 'rxjs';
import {EventService} from '@/services/event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  public currentMonth: Dayjs;
  public startOfCalendar: Dayjs;
  public startOfMonth: Dayjs;
  public endOfCalendar: Dayjs;
  public endOfMonth: Dayjs;
  public weeks: Array<Week|WeekForm>;
  public pendingEvent: PendingEvent|null;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    combineLatest(
      this.route.paramMap.pipe((
        map((route: any) => route.params)
      )),
      this.eventService.$events,
    ).subscribe(([{month, year}, events]) => {
      this.currentMonth = dayjs(`${year}/${month}`);
      this.calculateWeeks(events);
    });
    this.eventService.$pendingEvent.subscribe(pendingEvent => {
      this.pendingEvent = pendingEvent;
      if (this.weeks && !pendingEvent) {
        this.weeks = this.weeks.filter(week => this.isWeek(week));
      }
    });
  }

  private calculateWeeks(events: Event[] = []): void {
    const weeks = [];
    this.startOfMonth = this.currentMonth.startOf('month');
    this.endOfMonth = this.currentMonth.endOf('month');
    this.startOfCalendar = this.startOfMonth.startOf('week');
    // if end of month is a sunday, we don't have to add extra days
    this.endOfCalendar = this.endOfMonth.day() ? this.endOfMonth.endOf('week') : this.endOfMonth;
    const numberOfWeeks = Math.ceil(this.endOfCalendar.diff(this.startOfCalendar, 'week', true));
    let day: Dayjs = this.startOfCalendar;

    for (let i = 1; i <= numberOfWeeks; i++) {
      const week: Week = {
        number: day.week(),
        days: [],
      };

      for (let j = 1; j <= 7; j++) {
        week.days.push({
          day,
          events: this.getEventsOfDay(day, events),
        });
        day = day.add(1, 'day');
      }

      weeks.push(week);
    }

    this.weeks = weeks;
  }

  public isWeek(week: Week|WeekForm): boolean {
    return week.hasOwnProperty('number');
  }

  public isInSiblingMonth(day: Dayjs): boolean {
    return day.isBefore(this.startOfMonth) || day.isAfter(this.endOfMonth);
  }

  public isSelectionStart(day: Dayjs): boolean {
    return this.pendingEvent && this.pendingEvent.startDate &&
      dateHelper.getOlder(this.pendingEvent.startDate, this.pendingEvent.endDate).toISOString() === day.toISOString();
  }

  public isInSelection(day: Dayjs): boolean {
    if (this.pendingEvent && this.pendingEvent.startDate && this.pendingEvent.endDate) {
      return day.isBetween(this.pendingEvent.startDate, this.pendingEvent.endDate);
    }

    return false;
  }

  public isSelectionEnd(day: Dayjs): boolean {
    return this.pendingEvent && this.pendingEvent.startDate && this.pendingEvent.endDate &&
      dateHelper.getNewer(this.pendingEvent.startDate, this.pendingEvent.endDate).toISOString() === day.toISOString();
  }

  public doHover(day: Dayjs): void {
    if (
      this.pendingEvent &&
      this.pendingEvent.pending &&
      this.pendingEvent.startDate &&
      this.pendingEvent.endDate &&
      this.pendingEvent.endDate.toISOString() !== day.toISOString()
    ) {
      this.eventService.addEndDateToPending(day);
    }
  }

  public doClick(day: Dayjs): void {
    if (this.pendingEvent && this.pendingEvent.pending) {
      if (!this.pendingEvent.startDate) {
        this.eventService.addStartDateToPending(day);
      } else {
        this.eventService.addPendingStatusToPending(false);
        this.displayForm();
      }
      this.eventService.addEndDateToPending(day);
    }
  }

  private displayForm() {
    const { startDate, endDate } = this.pendingEvent;
    const selectedWeek = {
      startDay: dateHelper.getOlder(startDate, endDate),
      endDay: dateHelper.getNewer(startDate, endDate),
    };
    let formIndex = selectedWeek.endDay.week() - this.startOfMonth.week()  + 1;
    // if end day is a sunday, there will be an extra week, so let's decrease that
    if (0 === selectedWeek.endDay.day()) {
      formIndex--;
    }
    this.weeks.splice(formIndex, 0, selectedWeek);
  }

  private getEventsOfDay(day: Dayjs, events: Event[]) {
    return events.filter(event =>
      day.isSameOrAfter(event.startDate, 'day') && day.isSameOrBefore(event.endDate, 'day'));
  }
}
