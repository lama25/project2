import { WeatherRaw } from './interfaces/weather-raw';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from './interfaces/weather';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private URL = "https://api.openweathermap.org/data/2.5/weather?q="; 
  private KEY = "c2addb75777e24415bc0705646e8a194"; 
  private IMP = "units=metric"; 

  constructor(private http:HttpClient) { }

  searchWeatherData(cityName:string):Observable<Weather>{
    return this.http.get<WeatherRaw>(`${this.URL}${cityName}&APPID=${this.KEY}&${this.IMP}`).pipe(
      map(data => this.transformWeatherData(data)),
      catchError(this.handleError)
    )
  }
  
  
  private handleError(res:HttpErrorResponse){
    console.log(res.error);
    return throwError(res.error || 'Server erorr'); 
  }
  
  private transformWeatherData(data:WeatherRaw):Weather{
    return {
      name:data.name,
      country:data.sys.country,
      image:`https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`,
      description:data.weather[0].description,
      temperature:data.main.temp, 
      lat:data.coord.lat,
      lon:data.coord.lon
    } 
  }




}
