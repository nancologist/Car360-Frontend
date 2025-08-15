import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {
    Car,
    CarCard,
    LoginRequest,
    LoginResponse,
    SignupRequest
} from '../shared';
import {Observable} from 'rxjs';

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

    signUpUser(signupRequest: SignupRequest) {
        return this.http.post<null>(ApiService.BASE_URL + '/auth/signup', signupRequest)
    }

    login(loginRequest: LoginRequest) {
        return this.http.post<LoginResponse>(
            ApiService.BASE_URL + '/auth/login', loginRequest);
    }
}
