import { createReducer, on } from '@ngrx/store';
import {
    CarThumbnailDto,
    ColorOption,
    EquipmentDto,
    UpholsteryOption,
} from '../../shared';
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

    colorOptions: ColorOption[];
    colorOptionsAlreadyLoaded: boolean;
    selectedColorIds: number[];

    upholsteryOptions: UpholsteryOption[];
    upholsteryOptionsAlreadyLoaded: boolean;
    selectedUpholsteryIds: number[]
}

export const initialState: CarsState = {
    carThumbnails: null,
    carThumbnailsLoading: false,
    carThumbnailsAlreadyLoaded: false,

    equipments: [],
    equipmentsLoaded: false,
    selectedEquipments: [],
    equipmentSearchTerm: '',

    colorOptions: [],
    colorOptionsAlreadyLoaded: false,
    selectedColorIds: [],

    upholsteryOptions: [],
    upholsteryOptionsAlreadyLoaded: false,
    selectedUpholsteryIds: [],
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
    })),

    on(CarsActions.loadColorOptionsSuccess, (state, { data }): CarsState => ({
        ...state,
        colorOptions: data,
        colorOptionsAlreadyLoaded: true
    })),

    on(CarsActions.onColorSelected, (state, { colorIds }): CarsState => ({
        ...state,
        selectedColorIds: colorIds
    })),

    on(CarsActions.loadUpholsteryOptionsSuccess, (state, { data }): CarsState => ({
        ...state,
        upholsteryOptions: data,
        upholsteryOptionsAlreadyLoaded: true,
    })),

    on(CarsActions.onUpholsterySelected, (state, { upholsteryIds }): CarsState => ({
        ...state,
        selectedUpholsteryIds: upholsteryIds,
    }))
);
