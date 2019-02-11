import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Dayjs} from 'dayjs';
import {DATES} from '@/constants';
import {dayjs} from '@/helpers';

@Component({
  selector: 'app-page-calendar-sub-nav',
  templateUrl: './page-calendar-sub-nav.component.html',
  styleUrls: ['./page-calendar-sub-nav.component.scss']
})
export class PageCalendarSubNavComponent implements OnInit {
  public currentMonth: Dayjs;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((route: any) => route.params)
    ).subscribe(({month, year}) => {
      this.currentMonth = dayjs(`${year}/${month}`);
    });
  }

  public gotoPreviousMonth() {
    const newDate = this.currentMonth.subtract(1, 'month');
    this.router.navigate([`/calendar/${newDate.format(DATES.YEAR_MONTH)}`]);
  }

  public gotoNextMonth() {
    const newDate = this.currentMonth.add(1, 'month');
    this.router.navigate([`/calendar/${newDate.format(DATES.YEAR_MONTH)}`]);
  }

  public gotoToday() {
    const newDate = dayjs();
    this.router.navigate([`/calendar/${newDate.format(DATES.YEAR_MONTH)}`]);
  }

}
