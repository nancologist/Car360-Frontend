import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CarsActions } from './cars.actions';
import { exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { CarsSelectors } from './cars.selectors';

@Injectable()
export class CarsEffects {

    private readonly actions$ = inject(Actions);
    private readonly store = inject(Store);
    private readonly apiService = inject(ApiService);

    loadEquipments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CarsActions.loadEquipmentsStart),
            withLatestFrom(this.store.select(CarsSelectors.selectEquipmentsAlreadyLoaded)),
            exhaustMap(([_, alreadyLoaded]) => {
                if (alreadyLoaded) {
                    return of({
                        type: '[CarsEffects] Equipments already' +
                            ' loaded.'
                    });
                } else {
                    return this.apiService.getAllEquipments().pipe(map(
                        (equipments) => CarsActions.loadEquipmentsSuccess({ data: equipments })
                    ))
                }
            })
        )
    );

    loadColorOptions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CarsActions.loadColorOptionsStart),
            withLatestFrom(this.store.select(CarsSelectors.selectColorOptionsAlreadyLoaded)),
            exhaustMap(([_, alreadyLoaded]) => {
                if (alreadyLoaded) {
                    return of({
                        type: '[CarsEffects] Color options already' +
                            ' loaded.'
                    });
                } else {
                    return this.apiService.getAllColorOptions().pipe(map(
                        (options) => CarsActions.loadColorOptionsSuccess({ data: options })
                    ))
                }
            })
        )
    )

    loadCarThumbnails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CarsActions.loadCarThumbnailsStart),
            withLatestFrom(this.store.select(CarsSelectors.selectCarThumbnailsAlreadyLoaded)),
            exhaustMap(([_, alreadyLoaded]) => {
                if (alreadyLoaded) {
                    return of({
                        type: '[CarsEffects] Car thumbnails already' +
                            ' loaded.'
                    });
                } else {
                    return this.apiService.getAllCarThumbnails().pipe(map(
                        (carThumbnails) => CarsActions.loadCarThumbnailsSuccess({ data: carThumbnails })
                    ))
                }
            })
        )
    );
}
