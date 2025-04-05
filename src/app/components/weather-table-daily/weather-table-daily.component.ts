import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { PRIVATE_API } from '../../private/private_api';

@Component({
  selector: 'app-weather-table-daily',
  imports: [CommonModule],
  templateUrl: './weather-table-daily.component.html',
  styleUrl: './weather-table-daily.component.css',
})
export class WeatherTableDailyComponent implements OnChanges, OnInit {
  private platformId = inject(PLATFORM_ID);
  @Input() locationNameSearched: string | undefined;

  API_WEATHER_JSON: any[] = [];

  URL_API = 'https://api.tomorrow.io/v4/weather/forecast?location=';
  API_KEY = PRIVATE_API;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (
        sessionStorage.getItem('API_WEATHER_JSON') &&
        sessionStorage.getItem('locationNameSearched')
      ) {
        this.API_WEATHER_JSON = JSON.parse(
          sessionStorage.getItem('API_WEATHER_JSON') || '{}'
        );
        this.locationNameSearched =
          sessionStorage.getItem('locationNameSearched') || '';
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.locationNameSearched &&
      changes['locationNameSearched'].currentValue !== undefined
    ) {
      (document.querySelector('#locationNameSearched') as HTMLElement).classList.add('animate-pulse');
      const url: string =
        this.URL_API +
        changes['locationNameSearched'].currentValue.toLowerCase() +
        this.API_KEY;

      this.API_WEATHER_JSON = [];
      const dataRecivedJSON = this.getAPIResponse(url);
      setTimeout(() => {
        (document.querySelector('#locationNameSearched') as HTMLElement).classList.remove('animate-pulse');
      }, 2000);
      dataRecivedJSON.then((data) => {
        if (data.code && data.code === 400001) {
          alert('No se pudo encontrar la localización buscada');
          location.reload();
        } else {
          for (let index = 0; index < data.timelines.daily.length; index++) {
            this.API_WEATHER_JSON.push(data.timelines.daily[index]);
          }
          sessionStorage.setItem(
            'API_WEATHER_JSON',
            JSON.stringify(this.API_WEATHER_JSON)
          );
          sessionStorage.setItem(
            'locationNameSearched',
            changes['locationNameSearched'].currentValue
          );
        }
      });
    }
  }

  async getAPIResponse(url: string) {
    const apiResponse = await fetch(url);
    const dataRecivedJSON = await apiResponse.json();

    return dataRecivedJSON;
  }
}
