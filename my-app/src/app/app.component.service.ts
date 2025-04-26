import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ 
  providedIn: 'root'
 })
export class AppService {

  constructor(private http: HttpClient) {

  }

  getHello() {
     console.log('Hello app service!!!');
     
     // TODO: add the http request GET localhost:8080/hello here!
     return this.http.get('http://localhost:8080/hello')
   }
 }