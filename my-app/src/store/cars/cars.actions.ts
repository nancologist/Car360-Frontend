import { createAction, props } from '@ngrx/store';
import { CarThumbnailDto } from '../../shared';

export class CarsActions {
    public static updateCarThumbnails = createAction(
        '[Cars] Load Cars Success',
        props<{ data: CarThumbnailDto[] }>()
    )
}
