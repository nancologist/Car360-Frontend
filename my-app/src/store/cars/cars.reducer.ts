import { createReducer, on } from '@ngrx/store';
import { CarThumbnailDto } from '../../shared';
import { CarsActions } from './cars.actions';


export interface CarsState {
    carThumbnails: CarThumbnailDto[] | null;
}

export const initialState: CarsState = {
    carThumbnails: null
};

export const carsReducer = createReducer(
    initialState,
    on(CarsActions.updateCarThumbnails, (state, { data }): CarsState => ({
        ...state,
        carThumbnails: data
    }))
);
