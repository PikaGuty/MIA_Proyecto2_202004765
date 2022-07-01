import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css']
})
export class ReportarComponent implements OnInit {
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
    
    this.backend.reportarUsuario(obj).subscribe(
      res=>{
        js = JSON.parse(JSON.stringify(res)) 
        this.obtener();
        alert("El usuario \""+c+"\" fue reportado")
      },
      err=>{
        alert("Ocurrió un error")
      }
    )
  }

  
  obtener(){
    let obj = {status:"1"}
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

}
