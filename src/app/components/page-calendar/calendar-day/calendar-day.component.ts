import {Component, Input} from '@angular/core';
import {Day} from '@/interfaces';

@Component({
  selector: '[app-calendar-day]',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent {
  @Input() public day: Day;
}
