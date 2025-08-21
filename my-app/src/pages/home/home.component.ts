import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {CarCard} from '../../shared';
import {ApiService} from '../../api/api.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';

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

    constructor(
        private apiService: ApiService,
        private router: Router,
        private tokenService: TokenService
    ) {
    }

    ngOnInit() {

        if (this.tokenService.getToken()) {
            this.apiService.getCarInfos().subscribe(res => {
                this.carInfos = res;
            })
        }

        // TODO NEXT: Now you should intercept your requests (non-public
        //  ones) and add token to their headers
    }

    trackByCarId(index: number, carInfo: CarCard) {
        return carInfo.carId;
    }

    onCardClicked(id: number) {
        this.router.navigate(['car', id])
    }
}
