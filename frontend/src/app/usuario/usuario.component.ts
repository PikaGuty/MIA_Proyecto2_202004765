import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { PopUpPropietarioComponent } from '../pop-up-propietario/pop-up-propietario.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface FNode {
  nombre: string;
  id:string;
  size:string;
  fecha:string;
  contenido?: FNode[];
}

var TREE_DATA: FNode[] = [];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  contenido=""
  datosUsr:any;
  
  
  private _transformer = (node: FNode, level: number) => {
    return {
      expandable: !!node.contenido && node.contenido.length > 0,
      name: node.nombre,
      level: level,
      id: Number(node.id)
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.contenido,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private backend: BackendService, private router: Router, public dialog: MatDialog){

    let data = sessionStorage.getItem('correo');
    
    if(data!=null){
      var js:any;
      var resulta;
      console.log(data)
      var pet = {correo:data}
      this.backend.datosUsuario(pet).subscribe(
        res=>{
          this.datosUsr = JSON.parse(JSON.stringify(res));
          this.backend.obtenerDU({"propietario":this.datosUsr.nusr}).subscribe(
            res=>{
              js = JSON.stringify(res)
              this.contenido=js
              resulta=res;
              this.dataSource.data = JSON.parse(js);
            },
            err=>{
              alert("Ocurrió un error")
            }
          )
        },
        err=>{
          alert("Ocurrió un error")
        }
      )
    }   
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  openDialog( id: number, nombre:string): void {
    const dialogRef = this.dialog.open(PopUpPropietarioComponent, {
      width: '250px',
      
      data: {name: nombre,ide:id},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=""&&result!="--"&&result!=undefined){
        var js:any;
        var cuerpo = {propietario:result,id:id}
        this.backend.cambiarProp(cuerpo).subscribe(
          res=>{
            alert("Nuevo propietario de "+nombre+" es "+result);
          },
          err=>{
            alert("Ocurrió un error")
          }
        )  
        
      }
      
    });
  }

  abrir(event:any) {
    const file = event.target.files[0];
   
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      if(fileReader.result!=null){
        this.contenido=fileReader.result.toString()
        let obj = JSON.parse(this.contenido);

        let js:any
        this.backend.Cargar(obj).subscribe(
          res=>{
            js = JSON.parse(JSON.stringify(res)) 
            alert(js.Respuesta)
            this.backend.Obtener().subscribe(
              res=>{
                js = JSON.stringify(res)
                this.contenido=js
                console.log(res)
              },
              err=>{
                alert("Ocurrió un error")
              }
            )
          },
          err=>{
            alert("Ocurrió un error")
          }
        )
      }
    }
    fileReader.readAsText(file)   
  }
}