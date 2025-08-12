import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Car, CarCard} from '../shared';
import {catchError, map, Observable, of, startWith, tap} from 'rxjs';

interface RequestState<T> {
    data?: T;
    loading: boolean;
    error?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    static BASE_URL = 'http://localhost:8080/api';

    constructor(private http: HttpClient) {
    }

    getCarInfos(): Observable<CarCard[]> {
        return this.http.get<CarCard[]>(ApiService.BASE_URL + '/cars')
    }

    getCarById(id: number): Observable<Car> {
        return this.http.get<Car>(ApiService.BASE_URL + `/cars/${id}`)
    }

    getCarColorImageUrl(carId: number) {
        return `${ApiService.BASE_URL}/cars/${carId}/color-image`;
    }

    withLoadingAndError<T>(obs$: Observable<T>): Observable<RequestState<T>> {
        return obs$.pipe(
            tap(() => {
            }),
            map(data => ({data, loading: false, error: undefined})),
            startWith({data: undefined, loading: true, error: undefined}),
            catchError(error => of({
                data: undefined,
                loading: false,
                error: error.message
            }))
        );
    }
}
