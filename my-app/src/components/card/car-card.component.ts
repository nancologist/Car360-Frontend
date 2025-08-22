import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CarThumbnailDto } from '../../shared';
import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-car-card',
    imports: [MatCardModule, MatButtonModule, DatePipe, TitleCasePipe, NgIf],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
    @Input({ required: true }) car!: CarThumbnailDto;
    @Output() cardClicked = new EventEmitter<number>();

    viewCarDetails(carId: number | undefined) {
        this.cardClicked.emit(carId)
    }
}
