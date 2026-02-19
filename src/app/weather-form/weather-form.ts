import { CommonModule } from '@angular/common';
import { Component, Inject, inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather';
import { WeatherData } from '../models/weather.model';

@Component({
  selector: 'app-weather-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './weather-form.html',
  styleUrl: './weather-form.css',
})
  
export class WeatherForm implements OnInit {

  private weatherService = inject(WeatherService);

  weatherForm!: FormGroup;
  today = new Date().toISOString().split('T')[0];

  isUS: boolean;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.isUS = this.locale === 'en-US';
  }
  
  ngOnInit(): void {
    const tempMin = this.isUS ? -112 : -90; 
    const tempMax = this.isUS ? 140 : 60;

    const altMin = this.isUS ? -1410 : -430;
    const altMax = this.isUS ? 28000 : 8500;

    this.weatherForm = new FormGroup({
      city: new FormControl('', Validators.required),
      temperature: new FormControl(0, [Validators.required, Validators.min(tempMin), Validators.max(tempMax)]),
      altitude: new FormControl(0, [Validators.required, Validators.min(altMin), Validators.max(altMax)]),
      isRaining: new FormControl(false, Validators.required),
      date: new FormControl(this.today, [Validators.required, ]),
      networkPower: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5)]),
    });

      
  }
  
  get city() { return this.weatherForm.get('city'); }
  get temperature() { return this.weatherForm.get('temperature');}
  get altitude() { return this.weatherForm.get('altitude');}
  get isRaining() { return this.weatherForm.get('isRaining');}
  get date() { return this.weatherForm.get('date');}

  onSubmit() {
    let data = this.weatherForm.getRawValue() as WeatherData;

    if (this.isUS) {
      data = {
        ... data,
        temperature: parseFloat(((data.temperature - 32 ) / 1.8).toFixed(1)),
        altitude: parseFloat((data.altitude / 3.28084).toFixed(1))
      }
    }

    data = {
      ...data,
      city: data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase()
    }

    this.weatherService.addWeather(data).subscribe({
      next: (response) => {
        console.log("Success!", response);
        
        this.weatherForm.reset({
          city: '',
          temperature: 0,
          altitude: 0,
          isRaining: false,
          date: this.today,
          networkPower: 0
        })
      },
      error: (err) => console.error('Erro ao guardar:', err)
    });
    
  }

}