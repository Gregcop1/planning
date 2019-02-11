import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageCalendarComponent} from '@/components/page-calendar/page-calendar.component';
import * as dayjs_ from 'dayjs';
const dayjs = (dayjs_ as any).default || dayjs_;
import {DATES} from '@/constants';

const currentMonth = dayjs().format(DATES.YEAR_MONTH);

const routes: Routes = [
  { path: 'calendar/:year/:month', component: PageCalendarComponent },
  { path: 'calendar', redirectTo: `/calendar/${currentMonth}`, pathMatch: 'full' },
  { path: '', redirectTo: `/calendar/${currentMonth}`, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
