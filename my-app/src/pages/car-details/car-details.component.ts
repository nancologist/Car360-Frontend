import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app/app.component.service';
import {Car} from '../../shared';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-car-details',
  imports: [],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
    constructor(private appService: AppService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const carId = +(this.route.snapshot.params as { id: string }).id;
        this.appService.getCarById(carId).subscribe((car: Car) => {
            console.log(car)
            console.log(car.equipments![0])
        })
    }
}
