import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-main-navigation></app-main-navigation>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
