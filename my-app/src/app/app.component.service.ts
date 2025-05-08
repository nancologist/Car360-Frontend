import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Car, CarCard} from '../shared';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    getCarInfos(): Observable<CarCard[]> {
        return this.http.get<CarCard[]>('http://localhost:8080/api/cars')
    }

    getCarById(id: number): Observable<Car> {
        return this.http.get<Car>(`http://localhost:8080/api/cars/${id}`)
    }
}
