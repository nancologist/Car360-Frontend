import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule
} from '@angular/forms';
import { NgForOf } from '@angular/common';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { EquipmentDto } from '../../shared';

@Component({
    selector: 'app-input-chip',
    imports: [
        MatFormField,
        ReactiveFormsModule,
        MatFormField,
        MatAutocompleteTrigger,
        MatChipsModule,
        MatIcon,
        MatAutocomplete,
        MatOption,
        NgForOf,
        MatLabel,
        MatInput,

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

    @Input({ required: true })
    equipments!: EquipmentDto[];

    @Output()
    selectedEquipmentsUpdated = new EventEmitter<EquipmentDto[]>();

    @Output()
    inputFocused = new EventEmitter();

    selectedEquipments: EquipmentDto[] = [];

    value: any = '';
    isDisabled: boolean = false;

    remove(equipment: EquipmentDto) {
        this.selectedEquipments = this.selectedEquipments.filter(equ => equ.id !== equipment.id);
        this.selectedEquipmentsUpdated.emit(this.selectedEquipments);
    }

    selected(event: MatAutocompleteSelectedEvent) {
        const { value: equipment } = event.option as MatOption<EquipmentDto>;
        const isNew = this.selectedEquipments.findIndex(equ => equ.id === equipment.id) === -1;
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
    protected readonly onfocus = onfocus;

    onFocus() {
        this.inputFocused.emit()
    }
}
