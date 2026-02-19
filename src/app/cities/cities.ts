import { Component, inject, OnInit, signal } from '@angular/core';
import { WeatherService } from '../services/weather';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cities.html',
  styleUrl: './cities.css',
})
export class Cities implements OnInit{

  weatherService = inject(WeatherService);
  cities = signal<string[]>([]);

  ngOnInit(): void {
    this.weatherService.getCities().subscribe({
      next: (uniqueCities) => {
        this.cities.set(uniqueCities);
        console.log(this.cities());
      },
      error: (err) => console.error('Erro ao carregar dados', err)
    });
  }
}
