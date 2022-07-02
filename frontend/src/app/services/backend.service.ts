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

  Cargar(cuerpo:any){
    return this.http.post(`${this.URL}/convIngresar`, cuerpo)
  }

  Obtener(){
    return this.http.get(`${this.URL}/obtenerCarpetas`)
  }

  ObtenerUsuarios(cuerpo:any){
    return this.http.post(`${this.URL}/obtenerUsuarios`,cuerpo)
  }

  HabilitarUsuarios(cuerpo:any){
    return this.http.post(`${this.URL}/habilitar`,cuerpo)
  }
  
  ObtenerUsuariosH(){
    return this.http.get(`${this.URL}/obtenerUsuariosH`)
  }

  formatearJSON(){
    return this.http.get(`${this.URL}/formatearJSON`)
  }

  getFile(cuerpo:any){
    return this.http.post(`${this.URL}/getFile`,cuerpo)
  }

  cambiarProp(cuerpo:any){
    return this.http.post(`${this.URL}/cambiarProp`,cuerpo)
  }
  
  obtenerDU(cuerpo:any){
    return this.http.post(`${this.URL}/obtenerDU`,cuerpo)
  }

  datosUsuario(cuerpo:any){
    return this.http.post(`${this.URL}/datosUsuario`,cuerpo)
  }

  modificarUsuario(cuerpo:any){
    return this.http.post(`${this.URL}/modificarUsuario`,cuerpo)
  }

  nuevoArchCarp(cuerpo:any){
    return this.http.post(`${this.URL}/nuevoArchCarp`,cuerpo)
  }

  eliminArchCarp(cuerpo:any){
    return this.http.post(`${this.URL}/eliminArchCarp`,cuerpo)
  }

  modCarp(cuerpo:any){
    return this.http.post(`${this.URL}/modCarp`,cuerpo)
  }

  modArch(cuerpo:any){
    return this.http.post(`${this.URL}/modArch`,cuerpo)
  }

  reportarUsuario(cuerpo:any){
    return this.http.post(`${this.URL}/reportarUsuario`,cuerpo)
  }

  eliminarUsuario(cuerpo:any){
    return this.http.post(`${this.URL}/eliminarUsuario`,cuerpo)
  }

  compartirF(cuerpo:any){
    return this.http.post(`${this.URL}/compartirF`,cuerpo)
  }

  obtenerColab(cuerpo:any){
    return this.http.post(`${this.URL}/obtenerColab`,cuerpo)
  }

  terminarArchCarp(cuerpo:any){
    return this.http.post(`${this.URL}/terminarArchCarp`,cuerpo)
  }

  
}
