import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as locationActions from './location.actions';
import { ApiService } from '../../core/services/api-service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Injectable()
export class LocationEffects {

    actions$ = inject(Actions)
    apiService = inject(ApiService)
    toaster = inject(ToastrService)

    loadLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(locationActions.loadLocations),
            switchMap((action) => {
                const cityName = action.cityName
                return this.apiService.get('data/2.5/forecast', { q: cityName, appid: 'd4594364698122bfd1c4b3eb5f2ff19f', units: 'metric' }).pipe(
                    map((locations) => {
                        const filteredData: any[] = [];
                        const processedDates = new Set();
                        locations.list.forEach((entry: any) => {
                            const date = new Date(entry.dt_txt).toLocaleDateString();
                            if (!processedDates.has(date)) {
                                filteredData.push(entry);
                                processedDates.add(date);
                            }
                        });
                        locations.list = filteredData
                        return locationActions.loadLocationsSuccess({ locations })
                    }),
                    
                    catchError((error) => {
                        this.toaster.error(error.error.message)
                        return of(locationActions.loadLocationsFailure());
                    })
                )
            }),
        )
    );
}
