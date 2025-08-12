import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {CarCard} from '../../shared';
import {ApiService} from '../../app/api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [
        CardComponent,
        NgForOf,
        NgIf
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    carInfos: CarCard[] = [];

    constructor(private apiService: ApiService, private router: Router) {
    }

    ngOnInit() {
        this.apiService.getCarInfos().subscribe(res => {
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
