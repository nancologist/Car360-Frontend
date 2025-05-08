import { Component } from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {NgForOf} from "@angular/common";
import {CarDto, CarInfoDto} from '../../shared';
import {AppService} from '../../app/app.component.service';

@Component({
  selector: 'app-home',
    imports: [
        CardComponent,
        NgForOf
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    carInfos: CarInfoDto[] = [];

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.appService.getCarInfos().subscribe(res => {
            this.carInfos = res;
        })
    }

    trackByCarId(index: number, carInfo: CarInfoDto) {
        return carInfo.carId;
    }

    onCardClicked(id: number) {
        this.appService.getCarById(id).subscribe((car: CarDto) => {
            console.log(car)
        })
    }
}
