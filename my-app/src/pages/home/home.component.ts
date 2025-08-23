import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {CarThumbnail} from '../../shared';
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
    carThumbnails: CarThumbnail[] = [];

    constructor(
        private apiService: ApiService,
        private router: Router,
        private tokenService: TokenService
    ) {
    }

    ngOnInit() {
        this.apiService.getCarInfos().subscribe(res => {
            this.carThumbnails = res;
        })
    }

    trackByCarId(index: number, carInfo: CarThumbnail) {
        return carInfo.carId;
    }

    onCardClicked(id: number) {
        this.router.navigate(['car', id])
    }
}
