import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CarThumbnail} from '../../shared';
import {DatePipe, NgIf, TitleCasePipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-card',
    imports: [MatCardModule, NgIf, MatButtonModule, DatePipe, TitleCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
    @Input() car?: CarThumbnail;
    @Output() cardClicked = new EventEmitter<number>();

    viewCarDetails(carId: number | undefined) {
        this.cardClicked.emit(carId)
    }
}
