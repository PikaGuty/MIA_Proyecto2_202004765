import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cuenta-baja',
  templateUrl: './cuenta-baja.component.html',
  styleUrls: ['./cuenta-baja.component.css']
})
export class CuentaBajaComponent implements OnInit {
  usuarios:any;
  correo:any;
  
  constructor(private backend: BackendService, private router: Router){
    this.correo=sessionStorage.getItem("correo")
  }

  ngOnInit(): void {
    this.obtener();
  }

  Reportar(c:any){
    
    let obj = {nusr:c}
    let js:any;
    
    this.backend.eliminarUsuario(obj).subscribe(
      res=>{
        js = JSON.parse(JSON.stringify(res)) 
        this.obtener();
        alert("El usuario \""+c+"\" fue Eliminado")
      },
      err=>{
        alert("Ocurrió un error")
      }
    )
  }

  
  obtener(){
    let obj = {status:"3"}
    let js:any;
    this.backend.ObtenerUsuarios(obj).subscribe(
      res=>{
        js = JSON.parse(JSON.stringify(res)) 
        //alert(JSON.stringify(js))
        console.log(js)
        this.usuarios=js;
      },
      err=>{
        alert("Ocurrió un error")
      }
    )
  }

  habilitar(c:any){
    
    let obj = {nusr:c}
    let js:any;
    
    this.backend.HabilitarUsuarios(obj).subscribe(
      res=>{
        js = JSON.parse(JSON.stringify(res)) 
        this.obtener();
        alert("El usuario \""+c+"\" fue habilitado")
      },
      err=>{
        alert("Ocurrió un error")
      }
    )
  }

}
