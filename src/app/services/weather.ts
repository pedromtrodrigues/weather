import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private baseUrl = `https://crudcrud.com/api/60a80fc0ec124da6afd7e5cf57fabe0a/weather`;

  constructor(private http: HttpClient) { }

  addWeather(data: WeatherData) {
    return this.http.post<WeatherData>(this.baseUrl, data);
  }

  getWeatherCity(cityName: string) {
    // Receber uma lista de dados com o formato WeatherData
    // .pipe para filtrar os dados
    return this.http.get<Array<WeatherData>>(this.baseUrl).pipe(
      map(items => items.filter(item => 
        // Os que passam esta condição mater
        item.city === cityName
      ))
    );
  }

  deleteWeather(id: string): Observable<any>{ // Ver isto
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCities() {
    // Faz o pedido GET e recebe Array com a WeatherData
    return this.http.get<WeatherData[]>(this.baseUrl).pipe(
      map(data => {
        // Extraimos as várias cidades de cada objeto do array 
        const cityNames = data.map(item => item.city);

        // Set nao permite duplicados 
        // .. converte novamente para Array
        return [...new Set(cityNames)];
      })
    )
  }

}
