import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { distinctUntilChanged, map, Observable, of } from 'rxjs';
import { EquipmentDto } from '../../shared';
import { InputChipComponent } from '../input-chip/input-chip.component';
import { Store } from '@ngrx/store';
import { CarsSelectors } from '../../store/cars/cars.selectors';
import { CarsActions } from '../../store/cars/cars.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-filter',
    imports: [
        MatCard,
        ReactiveFormsModule,
        AsyncPipe,
        InputChipComponent
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

    filterForm = new FormGroup({
        searchEquipment: new FormControl('')
    })

    equipments$: Observable<EquipmentDto[]> = of([]);
    resultCount$: Observable<number | undefined> = of(0);

    constructor(private store: Store, private destroyRef: DestroyRef) {
    }

    ngOnInit() {
        this.setUpEquipments();
        this.resultCount$ = this.store
            .select(CarsSelectors.selectFilteredCarThumbnails)
            .pipe(map(arr => arr?.length));
        this.equipments$ = this.store.select(CarsSelectors.selectSearchedEquipments)
    }

    onSelectedEquipmentsUpdated(equipments: EquipmentDto[]) {
        const equipmentCodes = equipments.map(e => e.code);
        this.store.dispatch(CarsActions.onEquipmentSelected({ equipmentCodes }));
    }

    private setUpEquipments() {
        const equipmentControl = this.filterForm.get('searchEquipment')
        if (equipmentControl !== null) {
            equipmentControl.valueChanges
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    distinctUntilChanged(),
                    map(value => value?.toLowerCase().trim() ?? ''),
                )
                .subscribe((search) => {
                    this.store.dispatch(CarsActions.searchEquipments({ search }))
                });
        }
    }

    onInputFocused() {
        this.store.dispatch(CarsActions.loadEquipmentsStart())
    }
}
