import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {CarCard} from '../../shared';
import {AppService} from '../../app/app.component.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [
        CardComponent,
        NgForOf,
        NgIf
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    carInfos: CarCard[] = [];

    constructor(private appService: AppService, private router: Router) {
    }

    ngOnInit() {
        this.appService.getCarInfos().subscribe(res => {
            this.carInfos = res;
        })
    }

    trackByCarId(index: number, carInfo: CarCard) {
        return carInfo.carId;
    }

    onCardClicked(id: number) {
        this.router.navigate(['car', id])
    }
}
