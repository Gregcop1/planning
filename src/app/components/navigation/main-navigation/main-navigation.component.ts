import { Component } from '@angular/core';

interface Link {
  exact: boolean;
  label: string;
  url: string;
}

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent {
  public links: Link[] = [
    {label: 'Calendrier', url: '/calendar', exact: false},
    {label: 'CRA', url: '/cra', exact: true},
  ];
}
