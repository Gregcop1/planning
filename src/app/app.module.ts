import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDividerModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainNavigationComponent} from '@/components/navigation';
import {MatButtonModule} from '@angular/material/button';
import {DayPipe, MonthPipe, YearPipe} from '@/pipes';
import {
  CalendarComponent,
  CalendarSmallFormComponent,
  PageCalendarComponent,
  PageCalendarSubNavComponent
} from '@/components/page-calendar';

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
    CalendarSmallFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
