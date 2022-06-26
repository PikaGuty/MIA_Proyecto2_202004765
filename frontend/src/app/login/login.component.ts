import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  correo=""
  pass=""
  constructor(private backend: BackendService, private router: Router) { }


  ngOnInit(): void {
  }

  ingresar(){
    let js:any
    if((this.correo != "" && this.pass != "" )){
      //console.log(this.nombre+"\n"+this.apellido+"\n"+this.nusr+"\n"+this.correo+"\n"+this.telefono+"\n"+this.pass+"\n"+this.fnac+"\n"+this.fcre+"\n"+this.status)
      let obj = JSON.parse('{"correo": "'+this.correo+'", "pass": "'+this.pass+'"}');

      console.log(obj)
      this.backend.Login(obj).subscribe(
        res=>{
          js = JSON.parse(JSON.stringify(res)) 
          alert(js.Respuesta)
          if(js.Respuesta=="Bienvenido Administrador"){
            this.router.navigate(['/Admin']);
          }
        },
        err=>{
          alert("Ocurrió un error")
        }
      )
      this.correo = "";
      this.pass = "";
    }else{
      alert("Debe ingresar correo y contraseña")
      this.pass = "";
    }

  }
}
