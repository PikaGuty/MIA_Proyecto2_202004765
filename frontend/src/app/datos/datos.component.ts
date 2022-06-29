import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';



export interface DialogData {
  correo: string;
}

interface Usuarios {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})

export class DatosComponent implements OnInit {
  propietario=""
  selectedUSR="";

  usuarios: Usuarios[] = [
    {value: '--', viewValue: '--'}
  ];

  nombre="";
  apellido="";
  nusr="";
  correo="";
  telefono="";
  pass="";
  fnac="";
  fcre="";
  status="";

  constructor(private backend: BackendService, private router: Router,public dialogRef: MatDialogRef<DatosComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    
    
    var js:any;
    var resulta;
    this.backend.ObtenerUsuariosH().subscribe(
      res=>{
        js = JSON.stringify(res)
        //console.log(JSON.parse(js)[0])
        this.usuarios.push(JSON.parse(js)[0]);
      },
      err=>{
        alert("Ocurrió un error")
      }
    ) 
      
    var jcorreo={correo:data.correo}
    this.backend.datosUsuario(jcorreo).subscribe(
      res=>{
        console.log(res)
        let resp = JSON.parse(JSON.stringify(res))
        this.nombre=resp.nombre;//
        this.apellido=resp.apellido;//
        this.nusr=resp.nusr;//
        this.correo=resp.correo;//
        this.telefono=resp.telefono;
        this.pass=resp.pass;
        this.fnac=resp.fnac;
        this.fcre=resp.fcre;
        this.status=resp.status;
        
        //js = JSON.stringify(res)
        //console.log(JSON.parse(js))
        //this.usuarios.push(JSON.parse(js)[0]);
      },
      err=>{
        alert("Ocurrió un error")
      }
    ) 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
