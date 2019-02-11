import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-calendar',
  template: `
    <mat-drawer-container>
      <mat-drawer-content>
        <app-page-calendar-sub-nav></app-page-calendar-sub-nav>
        <app-calendar></app-calendar>
      </mat-drawer-content>
      <mat-drawer mode="side" opened position="end"></mat-drawer>
    </mat-drawer-container>
  `,
  styleUrls: ['./page-calendar.component.scss'],
})
export class PageCalendarComponent {}
