import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CarDto, CarInfoDto} from '../shared';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    getCarInfos(): Observable<CarInfoDto[]> {
        return this.http.get<CarInfoDto[]>('http://localhost:8080/api/cars')
    }

    getCarById(id: number): Observable<CarDto> {
        return this.http.get<CarDto>(`http://localhost:8080/api/cars/${id}`)
    }
}
