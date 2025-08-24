import {Component, forwardRef, Input} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule
} from '@angular/forms';
import {NgIf, TitleCasePipe} from '@angular/common';
import {
    MatAutocomplete,
    MatAutocompleteTrigger
} from '@angular/material/autocomplete';

@Component({
    selector: 'app-input',
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatFormField,
        TitleCasePipe,
        MatAutocompleteTrigger,
        NgIf
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    @Input({required: true})
    name!: string;

    @Input()
    type = 'text'

    @Input()
    autocomplete: 'on' | 'off' | 'new-password' = 'on';

    @Input()
    matAuto?: MatAutocomplete;

    value: any = '';
    isDisabled: boolean = false;

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
