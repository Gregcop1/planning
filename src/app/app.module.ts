import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainNavigationComponent} from '@/components/navigation';
import {DayPipe, MonthPipe, YearPipe} from '@/pipes';
import {
  CalendarComponent, CalendarSidebarComponent,
  CalendarSmallFormComponent,
  PageCalendarComponent,
  PageCalendarSubNavComponent
} from '@/components/page-calendar';
import { CalendarDayComponent } from './components/page-calendar/calendar-day/calendar-day.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    PageCalendarComponent,
    PageCalendarSubNavComponent,
    MonthPipe,
    YearPipe,
    CalendarComponent,
    DayPipe,
    CalendarSmallFormComponent,
    CalendarDayComponent,
    CalendarSidebarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
