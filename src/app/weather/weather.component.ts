import { Component, OnInit } from '@angular/core';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weatherData: any = [];
  temp: any;
  iconSrc = '';
  city: string = 'Alexandria';

  constructor(private serviceRequest: RequestService) {}

  private getData(_city: string) {
    this.serviceRequest.getWeather(this.city).subscribe({
      next: (res: any) => {
        this.weatherData = res;
        this.temp = (res.main.temp - 273.15).toFixed(2);
        this.iconSrc = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`;
      },
    });
    this.city = '';
  }

  ngOnInit(): void {
    this.city = 'Alexandria'
    this.getData(this.city);
  }

  newYork() {
    this.getData((this.city = 'new york'));
  }

  paris() {
    this.getData((this.city = 'paris'));
  }

  tokyo() {
    this.getData((this.city = 'tokyo'));
  }

  handleSubmit() {
    this.getData(this.city);
    this.city = '';
  }
}
