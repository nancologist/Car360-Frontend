import { Component, OnInit } from '@angular/core';
import { CarCardComponent } from "../../components/card/car-card.component";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { CarThumbnailDto } from '../../shared';
import { ApiService } from '../../api/api.service';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { FilterComponent } from '../../components/filter/filter.component';
import { Store } from '@ngrx/store';
import { CarsActions } from '../../store/cars/cars.actions';
import { CarsSelectors } from '../../store/cars/cars.selectors';


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
    carThumbnailsLoading: boolean = false;
    carThumbnails$: Observable<CarThumbnailDto[] | null> = of(null);

    constructor(
        private apiService: ApiService,
        private router: Router,
        private store: Store
    ) {
    }

    ngOnInit() {
        this.apiService.getCarInfos().pipe(
            tap(() => {
                this.carThumbnailsLoading = true;
            })
        ).subscribe((data: CarThumbnailDto[]) => {
            this.store.dispatch(CarsActions.updateCarThumbnails({ data }))
            this.carThumbnailsLoading = false;
        })
        this.carThumbnails$ = this.store.select(CarsSelectors.selectCarThumbnails);
    }

    trackByCarId(index: number, carInfo: CarThumbnailDto) {
        return carInfo.carId;
    }

    onCardClicked(id: number) {
        this.router.navigate(['car', id])
    }
}
