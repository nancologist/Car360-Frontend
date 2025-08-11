import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CarCard} from '../../shared';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-card',
    imports: [MatCardModule, NgOptimizedImage, NgIf, MatButtonModule, DatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
    @Input() car?: CarCard;
    @Output() cardClicked = new EventEmitter<number>();

    viewCarDetails(carId: number | undefined) {
        this.cardClicked.emit(carId)
    }
}
