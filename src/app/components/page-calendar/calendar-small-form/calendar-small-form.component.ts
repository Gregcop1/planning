import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';

@Component({
/* tslint:disable-next-line component-selector */
  selector: '[app-calendar-small-form]',
  template: `
    <input
      #field
      [ngClass]="{displayed: displayed}"
      type="text"
      placeholder="Donnez un nom à votre événement"
      name="label"
    />
  `,
  styleUrls: ['./calendar-small-form.component.scss']
})
export class CalendarSmallFormComponent implements OnInit {
  @ViewChild('field') private field;
  public displayed = false;

  constructor() { }

  ngOnInit() {
    (this.field.nativeElement as HTMLTextAreaElement).focus();
    this.displayed = true;
  }
}
