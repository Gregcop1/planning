import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {EventType} from '@/interfaces';
import {EventService} from '@/services/event.service';

@Component({
/* tslint:disable-next-line component-selector */
  selector: '[app-calendar-small-form]',
  template: `
    <input
      #field
      [ngClass]="{displayed: displayed}"
      (keyup.enter)="submit()"
      (keyup.escape)="cancel()"
      type="text"
      placeholder="Donnez un nom à votre événement"
      [(ngModel)]="value"
      name="label"
    />`,
  styleUrls: ['./calendar-small-form.component.scss']
})
export class CalendarSmallFormComponent implements OnInit {
  @HostBinding('class') selectionType: string;
  @HostBinding('class.form') classOverride = true;
  @ViewChild('field') private field;
  public displayed = false;
  public value = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.displayed = true;
    this.eventService.$pendingEvent.subscribe(event => {
      if (event) {
        this.selectionType = `form-type-${event.type}`;
        switch (event.type) {
          case EventType.UnpaidLeave: this.value = 'Sans solde Grégory Copin';
            break;
          case EventType.FreeVacation: this.value = 'Congé Grégory Copin';
            break;
          default: this.value = '';
        }
        (this.field.nativeElement as HTMLTextAreaElement).focus();
      }
    });
  }

  submit(): void {
    this.eventService.submitEvent(this.value);
  }

  cancel(): void {
    this.eventService.cancelPendingEvent();
  }
}
