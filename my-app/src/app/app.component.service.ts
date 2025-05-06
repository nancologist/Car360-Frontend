import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CarInfoDto} from '../shared';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    getCarInfos() {
        return this.http.get<CarInfoDto[]>('http://localhost:8080/api/cars')
    }
}
