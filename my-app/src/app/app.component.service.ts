import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Car, CarCard, LoginRequest} from '../shared';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    static BASE_URL = 'http://localhost:8080/api';

    constructor(private http: HttpClient) {
    }

    getCarInfos(): Observable<CarCard[]> {
        return this.http.get<CarCard[]>(AppService.BASE_URL + '/cars')
    }

    getCarById(id: number): Observable<Car> {
        return this.http.get<Car>(AppService.BASE_URL + `/cars/${id}`)
    }

    getCarColorImageUrl(carId: number) {
        return `${AppService.BASE_URL}/cars/${carId}/color-image`;
    }

    postLogin(data: LoginRequest) {
        return this.http.post(AppService.BASE_URL + '/login', data).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log(err); return throwError(() => new Error('ffsasf')) })
        );
    }
}
