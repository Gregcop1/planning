import {Component, OnInit} from '@angular/core';
import {EventType} from '@/interfaces';
import {EventService} from '@/services/event.service';

@Component({
  selector: 'app-calendar-sidebar',
  templateUrl: 'calendar-sidebar.component.html',
  styleUrls: ['calendar-sidebar.component.scss'],
})
export class CalendarSidebarComponent implements OnInit {
  public currentType: EventType|null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.$pendingEvent.subscribe(event => {
      this.currentType = event ? event.type : null;
    });
  }

  addPendingElement(type: EventType|null): void {
    this.eventService.addTypeToPending(type);
  }

  cancelPendingElement(type: EventType|null): void {
    this.eventService.cancelPendingEvent();
  }

  isPending(): boolean { return null !== this.currentType; }
}
