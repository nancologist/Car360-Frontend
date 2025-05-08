import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CarCard} from '../../shared';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-card',
    imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
    @Input() carInfo?: CarCard;
    @Output() cardClicked = new EventEmitter<number>();

    onCardClicked(carId: number | undefined) {
        this.cardClicked.emit(carId)
    }
}
