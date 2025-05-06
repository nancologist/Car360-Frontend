import {Component, Input} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {CarInfoDto} from '../../shared';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-card',
    imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
    @Input() carInfo?: CarInfoDto;
}
