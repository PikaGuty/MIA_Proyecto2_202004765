import { Component, Inject, OnInit, ElementRef, ViewChild  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;   


export interface DialogData {
  name: string;
  ide : number;
}

interface Usuarios {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-info-arch',
  templateUrl: './info-arch.component.html',
  styleUrls: ['./info-arch.component.css']
})

export class InfoArchComponent implements OnInit {
  propietario=""
  selectedUSR="";

  usuarios: Usuarios[] = [
    {value: '--', viewValue: '--'}
  ];

  nombre = "";
  texto = "";
  id = 0;

  constructor(private backend: BackendService, private router: Router,public dialogRef: MatDialogRef<InfoArchComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    var js:any;
    var resulta;
    

    var jid={id:data.ide}
    this.id = data.ide
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
      
    
    this.backend.getFile(jid).subscribe(
      res=>{
        console.log(res)
        this.nombre = JSON.parse(JSON.stringify(res)).nombre
        this.texto = JSON.parse(JSON.stringify(res)).texto
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

  generatePDF() {  
    var jid={id:this.id}
    var nombreArchivo="";
    var contenidoArchivo = ""
    this.backend.getFile(jid).subscribe(
      res=>{
        console.log(res)
        let docDefinition = {  
          header:JSON.parse(JSON.stringify(res)).nombre,
          content: JSON.parse(JSON.stringify(res)).texto
        };  
       
        pdfMake.createPdf(docDefinition).open();  

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

