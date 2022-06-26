import { Component, OnInit } from '@angular/core';

import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nombre = ""; 
  apellido = "";
  nusr = "";
  correo = "";
  telefono = "";
  pass = "";
  fnac = "";
  fcre="";
  status="0";
  
  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getDate().toString().padStart(2, '0'),
      ].join('-') +' '
    );
  }

  validarEmail(mail:string) { 
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail); 
  }

  validarContra(pass:string) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}/.test(pass); 
  }

  registrar(){
    let js:any

    if((this.nombre != "" && this.apellido != "" && this.nusr != "" && this.correo != "" &&  this.telefono != "" && this.pass != "" )){
      if(this.validarEmail(this.correo)){
        if(this.validarContra(this.pass)){
          this.fcre = this.formatDate(new Date()).toString();
          //console.log(this.nombre+"\n"+this.apellido+"\n"+this.nusr+"\n"+this.correo+"\n"+this.telefono+"\n"+this.pass+"\n"+this.fnac+"\n"+this.fcre+"\n"+this.status)
          let obj = JSON.parse('{ "nombre": "'+this.nombre+'", "apellido": "'+this.apellido+'", "nusr": "'+this.nusr+'", "correo": "'+this.correo+'", "telefono": '+this.telefono+', "pass": "'+this.pass+'", "fnac": "'+this.fnac+'", "fcre": "'+this.fcre+'", "status": "'+this.status+'" }');
    
          console.log(obj)
          this.backend.Registrar(obj).subscribe(
            res=>{
              js = JSON.parse(JSON.stringify(res)) 
              alert(js.Respuesta)
            },
            err=>{
              alert("Ocurrió un error")
            }
          )
          this.nombre = "";
          this.apellido = "";
          this.nusr = "";
          this.correo = "";
          this.telefono = "";
          this.pass = "";
          this.fnac = "";
          this.fcre="";
          this.status="0";
        }else{
          alert("La contraseña debe poseer mínimo 8 caracteres, al menos una letra mayúscula, números y símbolos")
          this.pass = "";
        }
      }else{
        alert("Debe ingresar un correo válido")
        this.correo = "";
      }
    }else{
      alert("Debe llenar todos los campos")
    } 
  }
}
