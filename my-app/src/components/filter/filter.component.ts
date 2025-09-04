import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';
import { distinctUntilChanged, map, Observable, of } from 'rxjs';
import { ColorOption, EquipmentDto } from '../../shared';
import { InputChipComponent } from '../input-chip/input-chip.component';
import { Store } from '@ngrx/store';
import { CarsSelectors } from '../../store/cars/cars.selectors';
import { CarsActions } from '../../store/cars/cars.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-filter',
    imports: [
        MatCard,
        ReactiveFormsModule,
        AsyncPipe,
        InputChipComponent,
        MatFormField,
        MatSelectModule,
        NgForOf,
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

    filterForm = new FormGroup({
        equipmentSearch: new FormControl(''),
        colorsMultiSelect: new FormControl<number[]>([])
    })

    equipments$: Observable<EquipmentDto[]> = of([]);
    colorOptions$: Observable<ColorOption[]> = of([]);

    resultCount$: Observable<number | undefined> = of(0);

    constructor(private store: Store, private destroyRef: DestroyRef) {
    }

    ngOnInit() {
        this.store.dispatch(CarsActions.loadColorOptionsStart());
        this.filterForm.get('colorsMultiSelect')?.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((colorIds) =>
                this.store.dispatch(
                    CarsActions.onColorSelected({ colorIds: colorIds ?? [] })
                )
            );

        this.setUpEquipments();
        this.resultCount$ = this.store
            .select(CarsSelectors.selectFilteredCarThumbnails)
            .pipe(map(arr => arr?.length));
        this.equipments$ = this.store.select(CarsSelectors.selectSearchedEquipments)
        this.colorOptions$ = this.store.select(CarsSelectors.selectColorOptions)
    }

    onSelectedEquipmentsUpdated(equipments: EquipmentDto[]) {
        const equipmentCodes = equipments.map(e => e.code);
        this.store.dispatch(CarsActions.onEquipmentSelected({ equipmentCodes }));
    }

    private setUpEquipments() {
        const equipmentControl = this.filterForm.get('equipmentSearch')
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
