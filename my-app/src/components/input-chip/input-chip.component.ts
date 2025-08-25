import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import {MatFormField} from '@angular/material/input';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule
} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption
} from '@angular/material/autocomplete';
import {MatChipGrid, MatChipsModule} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {EquipmentDto} from '../../shared';

@Component({
    selector: 'app-input',
    imports: [
        MatFormField,
        ReactiveFormsModule,
        MatFormField,
        MatAutocompleteTrigger,
        MatChipsModule,
        MatIcon,
        MatAutocomplete,
        MatOption,
        NgForOf
    ],
    templateUrl: './input-chip.component.html',
    styleUrl: './input-chip.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputChipComponent),
            multi: true
        }
    ]
})
export class InputChipComponent implements ControlValueAccessor {
    @Input({required: true})
    name!: string;

    @Input({required: true})
    matAuto!: MatAutocomplete;

    @Input({required: true})
    matChip!: MatChipGrid

    @Input({required: true})
    equipments!: EquipmentDto[];

    @Input()
    type = 'text'

    @Input()
    autocomplete: 'on' | 'off' | 'new-password' = 'on';

    @Output()
    selectedEquipmentsUpdated = new EventEmitter<EquipmentDto[]>();

    selectedEquipments: EquipmentDto[] = [];

    value: any = '';
    isDisabled: boolean = false;

    remove(equipment: EquipmentDto) {
        this.selectedEquipments = this.equipments.filter(equ => equ.id !== equipment.id);
        this.selectedEquipmentsUpdated.emit(this.selectedEquipments);
    }

    selected(event: MatAutocompleteSelectedEvent) {
        const { value: equipment } = event.option as MatOption<EquipmentDto>;
        const isNew = this.selectedEquipments.findIndex(equ => equ.id === equipment.id) !== -1;
        if (isNew) {
            this.selectedEquipments = [...this.selectedEquipments, equipment];
            this.selectedEquipmentsUpdated.emit(this.selectedEquipments);
        }
    }

    // Called when parent form writes a value to the component
    writeValue(value: any): void {
        this.value = value;
    }

    // Registers function to call when the value changes
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
    }

    onBlur(): void {
        this.onTouched();
    }

    private onChange = (value: any) => {
    };

    private onTouched = () => {
    };
}
