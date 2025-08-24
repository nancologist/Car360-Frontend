import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {InputComponent} from '../input/input.component';
import {MatAutocomplete, MatOption} from '@angular/material/autocomplete';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf} from '@angular/common';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    Observable,
    of,
    startWith,
    switchMap
} from 'rxjs';
import {EquipmentDto} from '../../shared';
import {ApiService} from '../../api/api.service';

@Component({
  selector: 'app-filter',
    imports: [
        MatCard,
        InputComponent,
        MatAutocomplete,
        MatOption,
        ReactiveFormsModule,
        AsyncPipe,
        NgForOf
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
        const equipmentControl = this.filterForm.get('searchEquipment')
        if (equipmentControl !== null) {
            this.equipments$ = equipmentControl.valueChanges
                .pipe(
                    filter(value => !!value && value?.trim().length >= 3),
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
