import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { PopUpPropietarioComponent } from '../pop-up-propietario/pop-up-propietario.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { InfoArchComponent } from '../info-arch/info-arch.component';

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
  carpeta:boolean;
}

@Component({
  selector: 'app-colab',
  templateUrl: './colab.component.html',
  styleUrls: ['./colab.component.css']
})
export class ColabComponent implements OnInit {

  contenido=""
  nuevoNombre=""
  datosUsr:any;
  
  
  private _transformer = (node: FNode, level: number) => {
    return {
      expandable: !!node.contenido && node.contenido.length > 0,
      name: node.nombre,
      level: level,
      id: Number(node.id),
      carpeta: ( node.contenido? true : false)
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
          this.backend.obtenerColab({"propietario":data}).subscribe(
            res=>{
              js = JSON.stringify(res)
              this.contenido=js
              resulta=res;
              this.dataSource.data = JSON.parse(js).Respuesta;
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
    const dialogRef = this.dialog.open(InfoArchComponent, {
      width: '500px',
      
      data: {name: nombre,ide:id},
    });

    dialogRef.afterClosed().subscribe(result => {
      var js:any;
      var cuerpo = {id:id,nombre:result.nombre,texto:result.texto}
      this.backend.modArch(cuerpo).subscribe(
        res=>{
          alert("Se ha modificado el archivo");
        },
        err=>{
          alert("Ocurrió un error")
        }
      )  
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

  async eliminar(id:number, nombre:string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea dejar de ser colaborador de '+nombre+'?',
      text: "Al dejar de ser colaborador ya no tendrá acceso a este archivo/carpeta",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let json={
          id:String(id),
          propietario:sessionStorage.getItem('correo')
        }
  
        var js:any;
        this.backend.terminarArchCarp(json).subscribe(
          res=>{
            //alert("Se ha actualizado la información");
          },
          err=>{
            alert("Ocurrió un error")
          }
        )

        swalWithBootstrapButtons.fire(
          'Eliminado',
          'Se ha terminado la relación de colaborador '+nombre,
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          '',
          'error'
        )
      }
    })
  }

  async editar(id:number, nombre:string){
    
    const { value: nom } = await Swal.fire({
      title: 'Editar carpeta',
      input: 'text',
      inputLabel: 'Nuevo nombre de la carpeta',
      inputPlaceholder: 'Ingresa el nombre para la carpeta',
      showCancelButton: true, 
      confirmButtonText: 'Editar', 
      cancelButtonText:'Cancelar'
    })
    
    if (nom) {

      let json={
        id:String(id),
        nombre:nom
      }

      var js:any;
      this.backend.modCarp(json).subscribe(
        res=>{
          //alert("Se ha actualizado la información");
        },
        err=>{
          alert("Ocurrió un error")
        }
      )

      Swal.fire(
        'Modificada',
        `Nombre de la carpeta: ${nom}`,
        'success'
      )
    }
  }

  async nuevaCarpeta(id:number){
    const { value: nombre } = await Swal.fire({
      title: 'Nueva carpeta',
      input: 'text',
      inputLabel: 'Nombre de la carpeta',
      inputPlaceholder: 'Ingresa el nombre para la carpeta',
      showCancelButton: true, 
      confirmButtonText: 'Crear', 
      cancelButtonText:'Cancelar'
    })
    
    if (nombre) {

      let json={
        id:String(id),
        js:{
          nombre:nombre,
          id:"1",
          size:"0",
          fecha:formatDate(new Date()),
          propietario:"",
          colaboradores:[],
          contenido:[]
        }
      }

      var js:any;
        this.backend.nuevoArchCarp(json).subscribe(
          res=>{
            //alert("Se ha actualizado la información");
          },
          err=>{
            alert("Ocurrió un error")
          }
        )

      Swal.fire(
        'Creada',
        `Nombre de la carpeta: ${nombre}`,
        'success'
      )
    }
  }

  async nuevoArchivo(id:number){
    const { value: nombre } = await Swal.fire({
      title: 'Nuevo Archivo',
      input: 'text',
      inputLabel: 'Nombre del archivo',
      inputPlaceholder: 'Ingresa el nombre para el archivo',
      showCancelButton: true, 
      confirmButtonText: 'Siguiente', 
      cancelButtonText:'Cancelar'
      
    })

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Contenido',
      inputPlaceholder: 'Contenido del archivo',
      inputAttributes: {
        'aria-label': 'Contenido del archivo'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear', 
      cancelButtonText:'Cancelar'
    })
    
    if (nombre&&text) {

      let json={
        id:String(id),
        js:{
          nombre:nombre,
          id:"1",
          size:"0",
          fecha:formatDate(new Date()),
          propietario:"",
          colaboradores:[],
          texto:text
        }
      }

      var js:any;
        this.backend.nuevoArchCarp(json).subscribe(
          res=>{
            alert("Se ha actualizado la información");
          },
          err=>{
            alert("Ocurrió un error")
          }
        )
      
      Swal.fire(
        'Creada',
        `Nombre del archivo: ${nombre}`,
        'success'
      )

    }
  }

  async compartir(id:number, nombre:string){
    const { value: correo } = await Swal.fire({
      title: 'Compartir',
      input: 'email',
      inputLabel: 'Correo electrónico',
      inputPlaceholder: 'Ingresa el correo electrónico para compartir',
      showCancelButton: true, 
      confirmButtonText: 'Enviar', 
      cancelButtonText:'Cancelar'
      
    })
    
    if (correo) {   
      let json={
        id:String(id),
        propietario:correo,
      }

      var js:any;
        this.backend.compartirF(json).subscribe(
          res=>{
            alert("Se ha añadido a "+correo);
          },
          err=>{
            alert("Ocurrió un error")
          }
        )
      Swal.fire(
        'Creada',
        `Nombre del archivo: ${correo}`,
        'success'
      )

    }
  }

  

}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}