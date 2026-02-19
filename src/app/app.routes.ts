import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home' 
    },
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./components/home/home').then(
                m => m.Home
            )
        }  
    },
    {
        path: 'insert',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./weather-form/weather-form').then(
                m => m.WeatherForm
            )
        }  
    },
    {
        path: 'cities',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./cities/cities').then(
                m => m.Cities
            )
        }  
    },
    {
        path: 'view/:cityName',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./weather-view/weather-view').then(
                m => m.WeatherView
            )
        }  
    },
    {
        path: "**",
        redirectTo: 'home'
    }
];
