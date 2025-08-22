import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarsState } from './cars.reducer';

export class CarsSelectors {

    private static selectCarsState = createFeatureSelector<CarsState>('cars');

    public static selectCarThumbnails = createSelector(
        this.selectCarsState, state => state.carThumbnails);

    public static selectCarThumbnailsCount = createSelector(
        this.selectCarsState, state => state.carThumbnails?.length ?? 0);
}
