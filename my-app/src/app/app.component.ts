import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppService} from './app.component.service';
import {CardComponent} from '../components/card/card.component';
import {CarDto, CarInfoDto} from '../shared';
import {NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CardComponent, NgForOf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    title = 'Welcome to Car360 🚗';
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
