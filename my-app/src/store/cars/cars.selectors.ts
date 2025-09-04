import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarsState } from './cars.reducer';

export class CarsSelectors {

    private static selectCarsState = createFeatureSelector<CarsState>('cars');


    // Equipments ----------------------

    public static selectAllEquipments = createSelector(
        this.selectCarsState, state => state.equipments
    )

    public static selectEquipmentsAlreadyLoaded = createSelector(
        this.selectCarsState, state => state.equipmentsLoaded
    )

    public static selectSelectedEquipments = createSelector(
        this.selectCarsState, state => state.selectedEquipments
    )

    private static selectEquipmentSearchTerm = createSelector(
        this.selectCarsState, state => state.equipmentSearchTerm
    )

    public static selectSearchedEquipments = createSelector(
        this.selectAllEquipments,
        this.selectEquipmentSearchTerm,
        (equipments, search) => {
            if (!search) return equipments;
            return equipments.filter(e => e.description.toLowerCase().includes(search))
        }
    )

    // ---------------------------------

    public static selectCarThumbnailsAlreadyLoaded = createSelector(
        this.selectCarsState, state => state.carThumbnailsAlreadyLoaded
    )

    public static selectCarThumbnailsLoading = createSelector(
        this.selectCarsState, state => state.carThumbnailsLoading
    )

    private static selectAllCarThumbnails = createSelector(
        this.selectCarsState, state => state.carThumbnails);

    public static selectFilteredCarThumbnails = createSelector(
        this.selectAllCarThumbnails,
        this.selectSelectedEquipments,
        (carThumbnails, selectedEquipments) => {
            if (carThumbnails !== null && selectedEquipments.length > 0) {
                return carThumbnails.filter(c => {
                    return selectedEquipments.every(selected => c.equipmentCodes.includes(selected));
                })
            }
            return carThumbnails;
        }
    )
}
