import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    CarDto,
    CarThumbnailDto,
    ColorOption,
    EquipmentDto,
    LoginRequest,
    LoginResponse,
    SignupRequest,
    UpholsteryOption,
} from '../shared';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    static BASE_URL = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getAllCarThumbnails(): Observable<CarThumbnailDto[]> {
        return this.http.get<CarThumbnailDto[]>(ApiService.BASE_URL + '/cars')
    }

    getCarById(id: number): Observable<CarDto> {
        return this.http.get<CarDto>(ApiService.BASE_URL + `/cars/${id}`)
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

    getAllEquipments() {
        return this.http.get<EquipmentDto[]>(ApiService.BASE_URL + `/equipments`)
    }

    getAllColorOptions() {
        return this.http.get<ColorOption[]>(ApiService.BASE_URL + `/colors`)
    }

    getAllUpholsteryOptions() {
        return this.http.get<UpholsteryOption[]>(ApiService.BASE_URL + `/upholsteries`);
    }
}
