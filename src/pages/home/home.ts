import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { LocationModel } from '../../models/location.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  TodaysDate = new Date().toDateString();

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  locations: LocationModel[] = [
    {
      city: 'Kingston',
      country: 'JM',
      weather: null
    },
    {
      city: 'Montego Bay',
      country: 'JM',
      weather: null
    },
  ];

  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider) {
  }

  ionViewWillEnter() {
    if (this.locations[0].weather == null) {
      this.locations[0].weather = [];
      this.weatherProvider.getWeather(this.locations[0].city, this.locations[0].country).subscribe((response:any) => {
        for (let item of response.list) {
          if (item.dt_txt.includes('06:00:00')) {

            let d = new Date(item.dt_txt);
            let dayName = this.days[d.getDay()];
            this.locations[0].weather.push({ day: dayName, forecast: item.weather[0] });
          }
        }
        console.log('Kingston', this.locations[0]);
      });
    }

    if (this.locations[1].weather == null) {
      this.locations[1].weather = [];
      this.weatherProvider.getWeather(this.locations[1].city, this.locations[1].country).subscribe((response:any) => {
        for (let item of response.list) {
          if (item.dt_txt.includes('06:00:00')) {

            let d = new Date(item.dt_txt);
            let dayName = this.days[d.getDay()];
            this.locations[1].weather.push({ day: dayName, forecast: item.weather[0] });
          }
        }
        console.log('Montego Bay', this.locations[1]);
      });
    }
  }
}
