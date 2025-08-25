import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    Observable,
    of,
    startWith,
    switchMap
} from 'rxjs';
import {EquipmentDto} from '../../shared';
import {ApiService} from '../../api/api.service';
import {InputChipComponent} from '../input-chip/input-chip.component';

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

    constructor(private apiService: ApiService) {
    }

    equipments$: Observable<{ data: EquipmentDto[] | null, loading: boolean }>
        = of({ data: null, loading: false });

    ngOnInit() {
        this.setupEquipmentSearch();
    }

    filterEquipments(equipments: EquipmentDto[]) {

    }

    private setupEquipmentSearch() {
        const equipmentControl = this.filterForm.get('searchEquipment')
        if (equipmentControl !== null) {
            this.equipments$ = equipmentControl.valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    map(value => value?.toLowerCase().trim() ?? ''),
                    switchMap(search => this.apiService.searchEquipments(search))
                ).pipe(
                    map(data => ({data, loading: false})),
                    startWith({data: null, loading: true})
                )
        }
    }
}
