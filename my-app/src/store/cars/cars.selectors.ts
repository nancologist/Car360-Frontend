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


    // ColorOptions ----------------------------------------

    public static selectColorOptions = createSelector(
        this.selectCarsState,
        state => state.colorOptions
    )

    public static selectColorOptionsAlreadyLoaded = createSelector(
        this.selectCarsState,
        state => state.colorOptionsAlreadyLoaded
    )

    private static selectSelectedColorIds = createSelector(
        this.selectCarsState,
        state => state.selectedColorIds
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
        this.selectSelectedColorIds,
        (carThumbnails, selectedEquipments, selectedColorIds) => {

            if (carThumbnails !== null) {

                if (selectedEquipments.length > 0 || selectedColorIds.length > 0) {

                    let filteredCarThumbnails = carThumbnails;
                    if (selectedColorIds.length > 0) {
                        filteredCarThumbnails = filteredCarThumbnails
                            .filter(car => selectedColorIds.includes(car.color.id));
                    }

                    if (selectedEquipments.length > 0) {
                        filteredCarThumbnails = filteredCarThumbnails.filter(car => {
                            return selectedEquipments.every(selected => car.equipmentCodes.includes(selected));
                        });
                    }

                    return filteredCarThumbnails;
                }

                return carThumbnails;
            }
            return null;
        }
    )
}
