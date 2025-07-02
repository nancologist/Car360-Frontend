import {Component, DestroyRef, OnInit} from '@angular/core';
import {AppService} from '../../app/app.component.service';
import {Car} from '../../shared';
import {ActivatedRoute} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError} from 'rxjs';

@Component({
    selector: 'app-car-details',
    imports: [
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatIcon,
        DatePipe,
        NgIf,
        NgForOf
    ],
    templateUrl: './car-details.component.html',
    styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
    car: Car | null = null;
    errMsg: String | null = null;

    constructor(
        public appService: AppService,
        private route: ActivatedRoute,
        private destroyRef: DestroyRef
    ) {
    }

    ngOnInit() {
        const carId = +(this.route.snapshot.params as { id: string }).id;
        this.appService
            .getCarById(carId)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                catchError((err, caught) => {
                    this.errMsg = err.error.message;
                    return caught;
                })
            )
            .subscribe((car: Car) => {
                this.car = car;
            });
    }

    onColorImageError(event: Event) {
        const imgElement = event.target as HTMLImageElement;
        if (imgElement) {
            imgElement.src = "assets/images/color-image-fallback.png";
        }
    }
}
