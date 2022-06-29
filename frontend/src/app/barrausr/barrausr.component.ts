import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { PopUpPropietarioComponent } from '../pop-up-propietario/pop-up-propietario.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatosComponent } from '../datos/datos.component';

@Component({
  selector: 'app-barrausr',
  templateUrl: './barrausr.component.html',
  styleUrls: ['./barrausr.component.css']
})
export class BarrausrComponent implements OnInit {

  correo="";

  constructor(private backend: BackendService, private router: Router, public dialog: MatDialog) {
    let data = sessionStorage.getItem('correo');
    console.log(data)
    if(data!=null){
      this.correo=data;
    }
  }

  ngOnInit(): void {
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
  
  salir(){
    
    this.router.navigate(['/Login']);
    sessionStorage.removeItem('correo');
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DatosComponent, {
      width: '500px',
      
      data: {correo:this.correo},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined||result!=null){
        var js:any;
        var cuerpo = result
        this.backend.modificarUsuario(cuerpo).subscribe(
          res=>{
            console.log(result)
            alert("Se ha actualizado la información");
          },
          err=>{
            alert("Ocurrió un error")
          }
        )
      }
        
        
      
      
    });
  }

  
}
