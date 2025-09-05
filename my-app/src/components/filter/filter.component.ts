import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, TitleCasePipe } from '@angular/common';
import { distinctUntilChanged, map, Observable, of, take } from 'rxjs';
import { ColorOption, EquipmentDto, UpholsteryOption } from '../../shared';
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
        TitleCasePipe,
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {

    filterForm = new FormGroup({
        equipmentSearch: new FormControl(''),
        colorsMultiSelect: new FormControl<number[]>([]),
        upholsteriesMultiSelect: new FormControl<number[]>([]),
    });

    equipments$: Observable<EquipmentDto[]> = of([]);
    colorOptions$: Observable<ColorOption[]> = of([]);
    upholsteryOptions$: Observable<UpholsteryOption[]> = of([]);

    resultCount$: Observable<number | undefined> = of(0);

    constructor(private store: Store, private destroyRef: DestroyRef) {
    }

    ngOnInit() {
        this.setUpColorFilter();
        this.setUpUpholsteryFilter();
        this.setUpEquipmentFilter();

        this.resultCount$ = this.store
            .select(CarsSelectors.selectFilteredCarThumbnails)
            .pipe(map(arr => arr?.length));
    }

    private setUpEquipmentFilter() {
        this.store.dispatch(CarsActions.loadEquipmentsStart());
        this.equipments$ = this.store.select(CarsSelectors.selectSearchedEquipments);
        this.onEquipmentSearchInputChanged();
    }

    private setUpColorFilter() {
        this.store.dispatch(CarsActions.loadColorOptionsStart());
        this.colorOptions$ = this.store.select(CarsSelectors.selectColorOptions);
        this.initSelectedColors();
        this.onSelectedColorsChanged();
    }

    private setUpUpholsteryFilter() {
        this.store.dispatch(CarsActions.loadUpholsteryOptionsStart());
        this.upholsteryOptions$ = this.store.select(CarsSelectors.selectUpholsteryOptions);
        this.initSelectedUpholsteries();
        this.onSelectedUpholsteriesChanged();
    }

    private onEquipmentSearchInputChanged() {
        this.filterForm.get('equipmentSearch')?.valueChanges
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                distinctUntilChanged(),
                map(value => value?.toLowerCase().trim() ?? ''),
            )
            .subscribe((search) => {
                this.store.dispatch(CarsActions.searchEquipments({ search }));
            });
    }

    private onSelectedUpholsteriesChanged() {
        this.filterForm.get('upholsteriesMultiSelect')?.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((upholsteryIds) =>
                this.store.dispatch(
                    CarsActions.onUpholsterySelected({ upholsteryIds: upholsteryIds ?? [] }),
                ),
            );
    }

    onSelectedEquipmentsChanged(selectedEquipments: EquipmentDto[]) {
        this.store.dispatch(CarsActions.onEquipmentSelected({ equipments: selectedEquipments }));
    }

    private onSelectedColorsChanged() {
        this.filterForm.get('colorsMultiSelect')?.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((colorIds) =>
                this.store.dispatch(
                    CarsActions.onColorSelected({ colorIds: colorIds ?? [] }),
                ),
            );
    }

    private initSelectedColors() {
        this.store.select(CarsSelectors.selectSelectedColorIds)
            .pipe(take(1))
            .subscribe(colorIds => {
                this.filterForm.get('colorsMultiSelect')?.setValue(colorIds);
            });
    }

    private initSelectedUpholsteries() {
        this.store.select(CarsSelectors.selectSelectedUpholsteryIds)
            .pipe(take(1))
            .subscribe(upholsteryIds => {
                this.filterForm.get('upholsteriesMultiSelect')?.setValue(upholsteryIds);
            });
    }
}
