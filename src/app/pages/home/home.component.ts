import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { WeatherTableDailyComponent } from '../../components/weather-table-daily/weather-table-daily.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [WeatherTableDailyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  locationSearched: string = '';
  getLocationNameSearched() {
    event?.preventDefault();
    this.locationSearched = (
      document.querySelector('#searchLocation') as HTMLInputElement
    ).value;
    (document.querySelector('#searchLocation') as HTMLInputElement).value = '';
  }
}
