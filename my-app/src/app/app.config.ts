import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    ApplicationConfig,
    isDevMode,
    provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { globalErrorInterceptor } from '../api/global-error-interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { carsReducer } from '../store/cars/cars.reducer';
import { CarsEffects } from '../store/cars/cars.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([globalErrorInterceptor])),

        provideStore({ cars: carsReducer }),
        provideEffects([CarsEffects]),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
    ]
};
