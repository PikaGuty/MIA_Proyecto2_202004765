import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cuenta-alta',
  templateUrl: './cuenta-alta.component.html',
  styleUrls: ['./cuenta-alta.component.css']
})
export class CuentaAltaComponent implements OnInit {
  usuarios:any;
  constructor(private backend: BackendService, private router: Router){}

  ngOnInit(): void {
    this.obtener();
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

  
  obtener(){
    let obj = {status:"0"}
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
