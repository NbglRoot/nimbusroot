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

  API_WEATHER_JSON_DAILY: any[] = [];
  API_WEATHER_JSON_HOUR: any[] = [];

  WEATHER_OPTION: string = 'daily';

  URL_API = 'https://api.tomorrow.io/v4/weather/forecast?location=';
  API_KEY = PRIVATE_API;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (
        sessionStorage.getItem('API_WEATHER_JSON') &&
        sessionStorage.getItem('locationNameSearched')
      ) {
        this.API_WEATHER_JSON_DAILY = JSON.parse(
          sessionStorage.getItem('API_WEATHER_JSON_DAILY') || '{}'
        );
        this.locationNameSearched =
          sessionStorage.getItem('locationNameSearched') || '';
      }
      if(sessionStorage.getItem('API_WEATHER_JSON_HOUR')) {
        this.API_WEATHER_JSON_HOUR = JSON.parse(
          sessionStorage.getItem('API_WEATHER_JSON_HOUR') || '{}'
        );
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.locationNameSearched &&
      changes['locationNameSearched'].currentValue !== undefined
    ) {
      try {
        this.getDailyWeather();
      } catch (e) {
        console.log('Error: Demasidas llamadas a la API.');
      }
    }
  }

  async getAPIResponse(url: string) {
    const apiResponse = await fetch(url);
    const dataRecivedJSON = await apiResponse.json();

    return dataRecivedJSON;
  }

  getDailyWeather() {
    if(this.WEATHER_OPTION !== 'daily') {
      this.WEATHER_OPTION = 'daily';
    }
    (document.querySelector('#locationNameSearched') as HTMLElement).classList.add('animate-pulse');
      const url: string =
        this.URL_API +
        this.locationNameSearched?.toLowerCase() +
        this.API_KEY;

      this.API_WEATHER_JSON_DAILY = [];
      const dataRecivedJSON = this.getAPIResponse(url);
      setTimeout(() => {
        (document.querySelector('#locationNameSearched') as HTMLElement).classList.remove('animate-pulse');
      }, 2000);
      dataRecivedJSON.then((data) => {
        if(data.code === 429001) {
          alert('Demasidas llamadas a la API. \nVuelva a intentarlo mas tarde.');
          location.reload();
        }
        if (data.code && data.code === 400001) {
          alert('No se pudo encontrar la localización buscada');
          location.reload();
        } else {
          for (let index = 0; index < data.timelines.daily.length; index++) {
            this.API_WEATHER_JSON_DAILY.push(data.timelines.daily[index]);
          }
          sessionStorage.setItem(
            'API_WEATHER_JSON_DAILY',
            JSON.stringify(this.API_WEATHER_JSON_DAILY)
          );
          sessionStorage.setItem(
            'locationNameSearched',
            this.locationNameSearched!
          );
        }
      });
  }

  getHourlyWeather() {
    if(this.locationNameSearched) {
      this.WEATHER_OPTION = 'hourly';
      (document.querySelector('#locationNameSearched') as HTMLElement).classList.add('animate-pulse');
        const url: string =
          this.URL_API +
          this.locationNameSearched.toLowerCase() +
          this.API_KEY;
  
        this.API_WEATHER_JSON_HOUR = [];
        const dataRecivedJSON = this.getAPIResponse(url);
        setTimeout(() => {
          (document.querySelector('#locationNameSearched') as HTMLElement).classList.remove('animate-pulse');
        }, 2000);
        dataRecivedJSON.then((data) => {
          console.log(data.timelines.hourly[0]);
            for (let index = 0; index < 11; index++) {
              this.API_WEATHER_JSON_HOUR.push(data.timelines.hourly[index]);
            }
            sessionStorage.setItem(
              'API_WEATHER_JSON_HOUR',
              JSON.stringify(this.API_WEATHER_JSON_HOUR)
            );
          }
        );
    }
  }
}
