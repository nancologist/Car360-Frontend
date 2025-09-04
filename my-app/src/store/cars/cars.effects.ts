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

    loadEquipment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CarsActions.loadEquipmentsStart),
            withLatestFrom(this.store.select(CarsSelectors.selectAllEquipmentsLoaded)),
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
    )
}
