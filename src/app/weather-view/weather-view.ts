import { Component, inject, OnInit, signal } from '@angular/core';
import { WeatherService } from '../services/weather';
import { WeatherData } from '../models/weather.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importante para pipes e diretivas
import { ConvertUnitsPipe } from '../pipes/convert-units-pipe';

@Component({
  selector: 'app-weather-view',
  standalone: true,
  imports: [CommonModule, ConvertUnitsPipe], 
  templateUrl: './weather-view.html',
  styleUrl: './weather-view.css',
})
export class WeatherView implements OnInit {
  private weatherService = inject(WeatherService);
  private route = inject(ActivatedRoute); 

  weatherItems = signal<WeatherData[]>([]);

  ngOnInit(): void {

    const cityName = this.route.snapshot.paramMap.get('cityName');

    if (cityName) {
      this.weatherService.getWeatherCity(cityName).subscribe({
        next: (cities) => {
          this.weatherItems.set(cities);
        },
        error: (err) => console.error('Erro ao carregar dados', err)
      });
    }
  }

  deleteWeather(id: string | undefined) {
    if (!id) {
      console.error('ID não encontrado.');
      return;
    }

    if (confirm("Tem a certeza que deseja remover?")) {
      this.weatherService.deleteWeather(id).subscribe({
        next: () => {
          this.weatherItems.update(items => items.filter(item => item._id !== id));
          console.log("Removido com sucesso.");
        },
        error: (err) => {
          console.log("Erro ao apagar:", err);
        }
      });
    }
  }
}