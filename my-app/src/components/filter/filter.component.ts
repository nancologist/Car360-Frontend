import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    Observable,
    of,
    startWith,
    switchMap
} from 'rxjs';
import { EquipmentDto } from '../../shared';
import { ApiService } from '../../api/api.service';
import { InputChipComponent } from '../input-chip/input-chip.component';
import { Store } from '@ngrx/store';
import { CarsActions } from '../../store/cars/cars.actions';
import { CarsSelectors } from '../../store/cars/cars.selectors';

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

    equipments$: Observable<{ data: EquipmentDto[] | null, loading: boolean }>
        = of({ data: null, loading: false });

    resultCount$: Observable<number> = of(0);

    constructor(private apiService: ApiService, private store: Store) {
    }

    ngOnInit() {
        this.setEquipments$();
        this.resultCount$ = this.store.select(CarsSelectors.selectCarThumbnailsCount);
    }

    filterEquipments(equipments: EquipmentDto[]) {
        const equipmentCodes = equipments.map(e => e.code);
        this.apiService.filterCarsByEquipment(equipmentCodes).subscribe((dtos) => {
            this.store.dispatch(CarsActions.updateCarThumbnails({ data: dtos }))
        })
    }

    private setEquipments$() {
        const equipmentControl = this.filterForm.get('searchEquipment')
        if (equipmentControl !== null) {
            this.equipments$ = equipmentControl.valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    map(value => value?.toLowerCase().trim() ?? ''),
                    switchMap(search => this.apiService.searchEquipments(search))
                ).pipe(
                    map(data => ({ data, loading: false })),
                    startWith({ data: null, loading: true })
                )
        }
    }
}
