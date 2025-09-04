import { Component, OnInit } from '@angular/core';
import { CarCardComponent } from "../../components/card/car-card.component";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { CarThumbnailDto } from '../../shared';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FilterComponent } from '../../components/filter/filter.component';
import { Store } from '@ngrx/store';
import { CarsActions } from '../../store/cars/cars.actions';
import { CarsSelectors } from '../../store/cars/cars.selectors';
import { IntroComponent } from '../../components/intro/intro.component';


@Component({
    selector: 'app-home',
    imports: [
        CarCardComponent,
        NgForOf,
        NgIf,
        AsyncPipe,
        FilterComponent,
        IntroComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    carThumbnailsLoading$: Observable<boolean> = of(false);
    carThumbnails$: Observable<CarThumbnailDto[] | null> = of(null);

    constructor(private router: Router, private store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(CarsActions.loadCarThumbnailsStart())
        this.carThumbnailsLoading$ = this.store.select(CarsSelectors.selectCarThumbnailsLoading);
        this.carThumbnails$ = this.store.select(CarsSelectors.selectFilteredCarThumbnails);
    }

    trackByCarId(index: number, carInfo: CarThumbnailDto) {
        return carInfo.carId;
    }

    onCardClicked(id: number) {
        this.router.navigate(['car', id])
    }
}
