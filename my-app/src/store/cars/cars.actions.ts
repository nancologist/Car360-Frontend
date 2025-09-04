import { createAction, props } from '@ngrx/store';
import { CarThumbnailDto, ColorOption, EquipmentDto } from '../../shared';

export class CarsActions {

    public static loadCarThumbnailsStart = createAction(
        '[Cars] Load car thumbnails start'
    )
    public static loadCarThumbnailsSuccess = createAction(
        '[Cars] Load car thumbnails success',
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

    public static loadColorOptionsStart = createAction('Load color options' +
        ' start');
    public static loadColorOptionsSuccess = createAction(
        'Load color options success',
        props<{ data: ColorOption[] }>()
    )

    public static onColorSelected = createAction(
        'Color selected',
        props<{ colorIds: number[] }>()
    );
}
