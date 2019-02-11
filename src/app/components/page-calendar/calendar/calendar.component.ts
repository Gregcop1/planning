import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Dayjs} from 'dayjs';
import {dayjs} from '@/helpers';
import {Week, WeekForm} from '@/interfaces';
import {dateHelper} from '@/helpers/date';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public currentMonth: Dayjs;
  public startOfMonth: Dayjs;
  public endOfMonth: Dayjs;
  public weeks: Array<Week|WeekForm>;
  public startSelection: Dayjs;
  public endSelection: Dayjs;
  public isSelectable = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((route: any) => route.params)
    ).subscribe(({month, year}) => {
      this.currentMonth = dayjs(`${year}/${month}`);
      this.calculateWeeks();
    });
  }

  private calculateWeeks(): void {
    const weeks = [];
    this.startOfMonth = this.currentMonth.startOf('month');
    this.endOfMonth = this.currentMonth.endOf('month');
    const startOfCalendar: Dayjs = this.startOfMonth.startOf('week');
    // if end of month is a sunday, we don't have to add extra days
    const endOfCalendar: Dayjs = this.endOfMonth.day() ? this.endOfMonth.endOf('week') : this.endOfMonth;
    const numberOfWeeks = Math.ceil(endOfCalendar.diff(startOfCalendar, 'week', true));
    let day: Dayjs = startOfCalendar;

    for (let i = 1; i <= numberOfWeeks; i++) {
      const week: Week = {
        number: day.week(),
        days: [],
      };

      for (let j = 1; j <= 7; j++) {
        week.days.push({
          day,
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
    return this.startSelection &&
      dateHelper.getOlder(this.startSelection, this.endSelection) === day;
  }

  public isInSelection(day: Dayjs): boolean {
    if (this.startSelection) {
      return day.isBetween(this.startSelection, this.endSelection);
    }

    return false;
  }

  public isSelectionEnd(day: Dayjs): boolean {
    return this.startSelection &&
      dateHelper.getNewer(this.startSelection, this.endSelection) === day;
  }

  public doHover(day: Dayjs): void {
    if (this.isSelectable && this.startSelection) {
      this.endSelection = day;
    }
  }

  public doClick(day: Dayjs): void {
    if (this.isSelectable) {
      if (!this.startSelection) {
        this.startSelection = day;
      } else {
        this.isSelectable = false;
        this.displayForm();
      }
      this.endSelection = day;
    }
  }

  private displayForm() {
    const selectedWeek = {
      startDay: dateHelper.getOlder(this.startSelection, this.endSelection),
      endDay: dateHelper.getNewer(this.startSelection, this.endSelection),
    };
    let formIndex = selectedWeek.endDay.week() - this.startOfMonth.week()  + 1;
    // if end day is a sunday, there will be an extra week, so let's decrease that
    if (0 === selectedWeek.endDay.day()) {
      formIndex--;
    }
    this.weeks.splice(formIndex, 0, selectedWeek);
  }
}
