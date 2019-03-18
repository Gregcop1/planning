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
      name="label"
    />`,
  styleUrls: ['./calendar-small-form.component.scss']
})
export class CalendarSmallFormComponent implements OnInit {
  @HostBinding('class') selectionType: string;
  @HostBinding('class.form') classOverride = true;
  @ViewChild('field') private field;
  public displayed = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    (this.field.nativeElement as HTMLTextAreaElement).focus();
    this.displayed = true;
    this.eventService.$pendingEvent.subscribe(event => {
      this.selectionType = event ? `form-type-${event.type}` : '';
    });
  }

  submit(): void {
    this.eventService.submitEvent(this.field.nativeElement.value);
  }

  cancel(): void {
    this.eventService.cancelPendingEvent();
  }
}
