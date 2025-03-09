import { DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as locationActions from './../../../../state/location/location.actions';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  @Input() locationData : any;

  store = inject(Store)

  onResetLocation(cityName:string){
    this.store.dispatch(locationActions.loadLocations({cityName:cityName})) 
  }

  getImageIcon(icons:string):string{
    return `./assets/images/weather-icons/${icons}.svg`
  }
  
}
