import { createReducer, on } from '@ngrx/store';
import { CarThumbnailDto, EquipmentDto } from '../../shared';
import { CarsActions } from './cars.actions';


export interface CarsState {
    carThumbnails: CarThumbnailDto[] | null;
    carThumbnailsLoading: boolean;
    carThumbnailsAlreadyLoaded: boolean,

    // Equipments
    equipments: EquipmentDto[];
    equipmentsLoaded: boolean;
    selectedEquipments: string[];
    equipmentSearchTerm: string;

    // selectedColors
}

export const initialState: CarsState = {
    carThumbnails: null,
    carThumbnailsLoading: false,
    carThumbnailsAlreadyLoaded: false,

    equipments: [],
    equipmentsLoaded: false,
    selectedEquipments: [],
    equipmentSearchTerm: '',
};

export const carsReducer = createReducer(
    initialState,

    on(CarsActions.loadCarThumbnailsStart, (state): CarsState => ({
        ...state,
        carThumbnailsLoading: true
    })),

    on(CarsActions.loadCarThumbnailsSuccess, (state, { data }): CarsState => ({
        ...state,
        carThumbnails: data,
        carThumbnailsLoading: false,
        carThumbnailsAlreadyLoaded: true
    })),

    // Equipments:
    on(CarsActions.loadEquipmentsSuccess, (state, { data }) => ({
        ...state,
        equipments: data,
        equipmentsLoaded: true
    })),
    on(CarsActions.onEquipmentSelected, (state, { equipmentCodes }) => ({
        ...state,
        selectedEquipments: equipmentCodes
    })),
    on(CarsActions.searchEquipments, (state, { search }) => ({
        ...state,
        equipmentSearchTerm: search
    }))
);
