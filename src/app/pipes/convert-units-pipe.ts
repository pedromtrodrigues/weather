import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnits',
  standalone: true
})
export class ConvertUnitsPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: number, type: 'temp' | 'alt'): string {

    const isUS = this.locale === 'en-US';
      
    if (type === 'temp') {
      if (isUS) {
        const f = (value * 1.8) + 32;
        return `${f.toFixed(1)} °F`;
      }
      return `${value} °C`;
    }

    if (type === 'alt') {
      if (isUS) {
        const f = (value * 3.28084);
        return `${f.toFixed(1)} ft`;
      }
      return `${value} m`;
    }

    return value.toString();
  }

  

}
