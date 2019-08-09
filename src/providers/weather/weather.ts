import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  API_KEY = 'aa270d4cddda91a6716fdcb52b6f4c99';
  URL;

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
    this.URL = 'http://api.openweathermap.org/data/2.5/forecast?';
  }

  getWeather(city, country){
    return this.http.get(this.URL + 'q=' + city + ',' + country + '&APPID=' + this.API_KEY);
  }

}
