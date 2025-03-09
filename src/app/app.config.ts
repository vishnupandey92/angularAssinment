import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppReducers } from './state/app.state';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { LocationEffects } from './state/location/location.effects';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(AppReducers),
    provideEffects(LocationEffects),
    provideToastr({
      timeOut: 2000,
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      tapToDismiss: true,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
  ]
};


