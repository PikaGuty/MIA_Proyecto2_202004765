import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';



export interface DialogData {
  name: string;
  ide : number;
}

interface Usuarios {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pop-up-propietario',
  templateUrl: './pop-up-propietario.component.html',
  styleUrls: ['./pop-up-propietario.component.css']
})

export class PopUpPropietarioComponent implements OnInit {
  propietario=""
  selectedUSR="";

  usuarios: Usuarios[] = [
    {value: '--', viewValue: '--'}
  ];

  

  constructor(private backend: BackendService, private router: Router,public dialogRef: MatDialogRef<PopUpPropietarioComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    var js:any;
    var resulta;
    var jid={id:data.ide}
    this.backend.ObtenerUsuariosH().subscribe(
      res=>{
        js = JSON.stringify(res)
        //console.log(JSON.parse(js)[0])
        for (let i = 0; i < JSON.parse(js).length; i++) {
          this.usuarios.push(JSON.parse(js)[i]);
        }
        
      },
      err=>{
        alert("Ocurrió un error")
      }
    ) 
      
    
    this.backend.getFile(jid).subscribe(
      res=>{
        console.log(res)
        this.propietario=JSON.parse(JSON.stringify(res)).propietario
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
