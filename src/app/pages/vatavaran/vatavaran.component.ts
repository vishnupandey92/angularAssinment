import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/services/api-service';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from '../../core/components/ui/weather/weather.component';
import { Store } from '@ngrx/store';
import * as locationActions from './../../state/location/location.actions';
import { Observable, map } from 'rxjs';
import { selectLoading, selectLocations } from '../../state/location/location.selector';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../core/components/ui/loader/loader.component';



@Component({
  selector: 'app-vatavaran',
  standalone: true,
  imports: [FormsModule,WeatherComponent,AsyncPipe,LoaderComponent],
  templateUrl: './vatavaran.component.html',
  styleUrl: './vatavaran.component.scss'
})
export class VatavaranComponent {
  
  apiService = inject(ApiService)
  store = inject(Store)
  loading$ = this.store.select(selectLoading);
  cityName!:string;
  selectedLocation = null

  locations$:Observable<any> = this.store.select(selectLocations);
  
  loadLocations(cityName:string) {
    if(cityName.length === 0) return 
    this.store.dispatch(locationActions.loadLocations({cityName:cityName}));
    this.cityName = ''
  }

  getSelectedLocation(id: number) {
    this.store.select(selectLocations).pipe(
      map((locations:any) => locations.find((location:any) => location.city.id === id))
    ).subscribe(selectedLocation => {
      this.selectedLocation = selectedLocation;
    });
  }

  onDeleteLocation(cityId:number){
    this.store.dispatch(locationActions.DeleteLocation({id:cityId})) 
  }

  onResetLocation(cityName:string){
    this.store.dispatch(locationActions.loadLocations({cityName})) 
  }

  onResetAllLocation(){
    this.store.dispatch(locationActions.ResetAllLocation())
  }
}
