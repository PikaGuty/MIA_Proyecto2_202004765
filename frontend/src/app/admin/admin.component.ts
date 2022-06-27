import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { PopUpPropietarioComponent } from '../pop-up-propietario/pop-up-propietario.component';

interface FoodNode {
  nombre: string;
  id:string;
  size:string;
  fecha:string;
  contenido?: FoodNode[];
}

var TREE_DATA: FoodNode[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  contenido=""
  
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.contenido && node.contenido.length > 0,
      name: node.nombre,
      level: level,
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

  constructor(private backend: BackendService, private router: Router, private dialogProp:MatDialog){
    var js:any;
    var resulta;
    this.backend.Obtener().subscribe(
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
    
    
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  ver(a:any){
    console.log(a)
    this.dialogProp.open(PopUpPropietarioComponent,{
      data:"Javier"
    })
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