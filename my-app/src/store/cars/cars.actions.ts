import { createAction, props } from '@ngrx/store';
import { CarThumbnailDto, EquipmentDto } from '../../shared';

export class CarsActions {

    public static loadCarThumbnailsSuccess = createAction(
        '[Cars] Load Cars Success',
        props<{ data: CarThumbnailDto[] }>()
    )

    public static onEquipmentSelected = createAction(
        '[Cars] Update selected equipments',
        props<{ equipmentCodes: string[] }>()
    );

    public static loadEquipmentsStart = createAction('Load equipments start');
    public static loadEquipmentsSuccess = createAction(
        'Load equipments success',
        props<{ data: EquipmentDto[] }>()
    );

    public static searchEquipments = createAction(
        'Search equipments',
        props<{ search: string }>()
    );
}
