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

    constructor(
        private appService: AppService,
        private route: ActivatedRoute,
        private destroyRef: DestroyRef
    ) {
    }

    ngOnInit() {
        const carId = +(this.route.snapshot.params as { id: string }).id;
        this.appService
            .getCarById(carId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((car: Car) => {
                this.car = car;
            });
    }
}
