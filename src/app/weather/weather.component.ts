import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  city = '';
  weatherData: any;
  forecastData: any[] = [];
  isDark = false;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (!this.city) {
      alert('Please enter city name');
      return;
    }

    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: data => this.weatherData = data,
      error: () => alert('City not found')
    });

    this.weatherService.getForecast(this.city).subscribe({
      next: (data: any) => {
        this.forecastData = data.list.filter(
          (item: any) => item.dt_txt.includes('12:00:00')
        );
      }
    });
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
  }
}
