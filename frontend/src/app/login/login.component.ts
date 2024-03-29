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
    let corrreo="";
    if((this.correo != "" && this.pass != "" )){
      corrreo=this.correo;
      //console.log(this.nombre+"\n"+this.apellido+"\n"+this.nusr+"\n"+this.correo+"\n"+this.telefono+"\n"+this.pass+"\n"+this.fnac+"\n"+this.fcre+"\n"+this.status)
      let obj = JSON.parse('{"correo": "'+this.correo+'", "pass": "'+this.pass+'"}');

      console.log(obj)
      this.backend.Login(obj).subscribe(
        res=>{
          js = JSON.parse(JSON.stringify(res)) 
          
          if(js.Respuesta=="Bienvenido Administrador"){
            this.router.navigate(['/Admin']);
            sessionStorage.setItem('correo', ""+corrreo+"");
          }else if(js.Respuesta=="Su cuenta aún no ha sido habilitada por el administrador"){
            this.router.navigate(['/Calmao'])
          }else if(js.Respuesta=="Bienvenido"){
            sessionStorage.setItem('correo', ""+corrreo+"");
            this.router.navigate(['/Usuario']);
          }else if(js.Respuesta=="Ha llegado a su cuenta un correo para establecer una contraseña nueva"){
            alert(js.Respuesta)
          }else if(js.Respuesta=="Correo y/o contraseña incorrectos"){
            this.router.navigate(['/Denegao'])
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
