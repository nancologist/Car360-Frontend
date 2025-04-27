import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ 
  providedIn: 'root'
 })
export class AppService {

  constructor(private http: HttpClient) {

  }

  getHello() {
    return this.http.get<{ message: string }>('http://localhost:8080/hello')
  }

  getUsers() {
    return this.http.get('http://localhost:8080/users')
  }
}