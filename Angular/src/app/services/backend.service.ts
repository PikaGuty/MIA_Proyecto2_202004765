import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }
  URL:string = 'http://127.0.0.1:4000';

  Registrar(cuerpo:any){
    //console.log(cuerpo)
    return this.http.post(`${this.URL}/ingresarUser`, cuerpo)
  }

  Login(cuerpo:any){
    return this.http.post(`${this.URL}/Login`, cuerpo)
  }
}
