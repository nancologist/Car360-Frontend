import {Component, OnInit} from '@angular/core';
import {CarCardComponent} from "../../components/card/car-card.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CarThumbnail} from '../../shared';
import {ApiService} from '../../api/api.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {map, Observable, of, startWith} from 'rxjs';
import {FilterComponent} from '../../components/filter/filter.component';

type CarThumbnailsState = { data: CarThumbnail[] | null, loading: boolean };

@Component({
    selector: 'app-home',
    imports: [
        CarCardComponent,
        NgForOf,
        NgIf,
        AsyncPipe,
        FilterComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    carThumbnailsState$: Observable<CarThumbnailsState> = of({
        data: null,
        loading: false
    });

    constructor(
        private apiService: ApiService,
        private router: Router,
        private tokenService: TokenService
    ) {
    }

    ngOnInit() {
        this.carThumbnailsState$ = this.apiService.getCarInfos().pipe(
            map(data => ({data, loading: false})),
            startWith({data: null, loading: true})
        )
    }

    trackByCarId(index: number, carInfo: CarThumbnail) {
        return carInfo.carId;
    }

    onCardClicked(id: number) {
        this.router.navigate(['car', id])
    }
}
